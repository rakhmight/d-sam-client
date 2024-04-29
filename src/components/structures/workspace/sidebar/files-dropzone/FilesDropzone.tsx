// @ts-nocheck

import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone} from 'react-dropzone'
import * as XLSX from 'xlsx'
import { Image, Text, Spinner, useToast, ToastPosition } from '@chakra-ui/react'
import { DataTypes } from '@/store/current-data/enums'
import { ExcelDateToJSDate } from '@/utils/excelDateToJSDate'
import { useActions } from '@/hooks/useActions/useActions'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { validateExcelDate } from '@/utils/validateExcelDate'

interface FileDropzoneProps {
    componentStyles?: string
}

const baseStyle = {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    outline: 'none',
    transition: 'border .24s ease-in-out'
}

const acceptStyle = {
  borderColor: '#0b2638'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const FilesDropzone : FC<FileDropzoneProps> = ({ componentStyles }) => {
  const { currentData } = useSelector((state:RootState)=>state)

    const toast = useToast()
    const toastGeneral:{position:ToastPosition, variant:string, size: string, duration: number, containerStyle: Object} = {
        position: 'bottom-right',
        variant: 'left-accent',
        size: 'sm',
        duration: 3000,
        containerStyle: {
            fontSize: '0.9rem',
            width: '320px',
            overflowX: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
        }
    }

    const { addCurrentData, switchFilesUploaded, addToStack, setStackFileCount, setStackReadFileCount } = useActions()

    const [isLoad, setIsLoad] = useState(false)
    const [errorData, setErrorData] = useState({ status: false, msg: '' })

    const [fileCounter, setFileCounter] = useState(0)
    const [readFileCounter, setReadFileCounter] = useState(0)
    const [fileCount, setFileCount] = useState(0)
    const [fileReaderStep, setFileReaderStep] = useState('read')

    const [processedDataCount, setProcessedDataCount] = useState(0)
    const [dataCount, setDataCount] = useState(0)

    const [loadDone, setLoadDone] = useState(false)
    const [readerData, setReaderData] = useState<Array<Array<DataObject>>>([])
    const [filesName, setFilesName] = useState<Array<string>>([])

    const onDrop = useCallback((acceptedFiles:Array<File>) => {     
        
        if(acceptedFiles.length){            
            
            switchFilesUploaded({state: false})
            setReaderData([])
            setFileCount(acceptedFiles.length)
            setStackFileCount(acceptedFiles.length)
            setIsLoad(true)
            setLoadDone(false)          

            acceptedFiles.forEach((file:File) => {
                const reader = new FileReader()
    
                if ( /\.(xlsx)$/i.test(file.name) || /\.(xls)$/i.test(file.name) ) {
                    reader.readAsArrayBuffer(file)
                } else {
                    toast({
                        ...toastGeneral,
                        title: 'Файл должен быть с расширение .xlsx/.xls',
                        status: 'error',
                    })
                    return
                }
                
                reader.onabort = (e) => {
                    console.error('Error:', e)
                    setErrorData({status: true, msg: 'Произошла ошибка (возможно файл повреждён)'})
                    toast({
                        ...toastGeneral,
                        title: 'Произошла ошибка (возможно файл повреждён)',
                        status: 'error',
                    })
                    return
                }
                reader.onerror = (e) => {
                    console.error('Error:', e)
                    setErrorData({status: true, msg: 'Произошла ошибка (возможно файл повреждён)'})
                    toast({
                        ...toastGeneral,
                        title: 'Произошла ошибка (возможно файл повреждён)',
                        status: 'error',
                    })
                    return
                }

                reader.onloadstart = () => {
                    setFileReaderStep('read')
                    setFileCounter((value) => value+1)
                }
    
                reader.onload = () => {
                    const binaryStr = reader.result
                    const out = XLSX.read(binaryStr, { type: 'binary' })
                    const rowObject = XLSX.utils.sheet_to_row_object_array(out.Sheets[out.SheetNames[0]])
                    
                    setReaderData(value =>[rowObject, ...value])
                    setFilesName(value => [file.name, ...value])
                }
            })
        }
    }, [])

    useEffect(() => {
        if(loadDone){            
            switchFilesUploaded({state: true})
            setIsLoad(false)
            setFileCounter(0)
            setReadFileCounter(0)
            setFileCount(0)
            setDataCount(0)
            setProcessedDataCount(0)
            setFileReaderStep('read')
        }
    }, [loadDone])

    useEffect(() => {       
        
        if(readerData.length == fileCount && readerData.length!=0){       
        
            readerData.forEach(async (rowObject, i) => {
             
                setFileReaderStep('processing')
                setReadFileCounter(i+1)
                setStackReadFileCount(i+1)
                setDataCount(rowObject.length)
                setProcessedDataCount(0)

                
                const sameFile = currentData.files.find(file  => file.name === filesName[i])

                if(!sameFile){
                    if(rowObject.length){
                        const fileKeys = Object.keys(rowObject[0])
            
                        const datasets:Array<Omit<DatasetI, 'fileID'>> = fileKeys.map( fileKey => {
                            return {
                                fileKey,
                                items: [],
                                type: DataTypes.String
                            }
                        })
            
                        rowObject.forEach((dataElm:DataObject) => {
                            datasets.forEach((datasetElm) => {
                                datasets[datasets.indexOf(datasetElm)].items.push(dataElm[datasetElm.fileKey])
                            })
                            setProcessedDataCount( (value) => value + 1 )
                        })
    
                     
                        setFileReaderStep('filtering')
                        const filteredDatasets:Array<Omit<DatasetI, 'fileID'>> = []

                        const dateStackTmp:Array<{ fileName: string, fileKey: string }> = []
            
                        datasets.forEach((datasetElm) => {
                            const filteredDatasetItems = new Set(datasetElm.items)
                            const filteredDatasetItemsArray = Array.from(filteredDatasetItems)
                                    
                            let type = datasetElm.type
                                    
                            // auto typing and Date normalization
                            if(typeof +filteredDatasetItemsArray[0] == 'number' && !isNaN(+filteredDatasetItemsArray[0])) {
                                type = DataTypes.Number

                                const date = ExcelDateToJSDate(+filteredDatasetItemsArray[0])
                                if(date.getFullYear() > 2000 && date.getFullYear() < 2070){
                                    type = DataTypes.Date

                                    // добавление в очередь
                                    dateStackTmp.push({ fileName: filesName[i], fileKey: datasetElm.fileKey })
                                }

                                if(type == DataTypes.Date){
                                    const filteredDatasetItemsArrayAsDate = filteredDatasetItemsArray.map(item => {
                                        return validateExcelDate(item)
                                    }).filter(v => typeof v == 'number' && !isNaN(v))
    
                                    filteredDatasetItemsArray.splice(0, filteredDatasetItemsArray.length)
                                    filteredDatasetItemsArray.push(...filteredDatasetItemsArrayAsDate)
                                }

                                if(type == DataTypes.Number){
                                    const result = /\998\d{2}\d{3}\d{2}\d{2}/.test(filteredDatasetItemsArray[0].toString())
                                    if(result) type = DataTypes.Telephone
                                }
                            }
                            
                            if(filteredDatasetItemsArray.length > 1){
                                const filteredDataset = {
                                    type: type,
                                    fileKey: datasetElm.fileKey,
                                    items: filteredDatasetItemsArray
                                }
                            
                                filteredDatasets.push(filteredDataset)
                            }
                        })

                        if(dateStackTmp.length){
                            addToStack(dateStackTmp)
                        }                        
                 
                        const fileData = {
                            name: filesName[i],
                            data: rowObject,
                            datasets: filteredDatasets,
                            fileKeys
                        }
        
                        addCurrentData([fileData])
                        
                        toast({
                            ...toastGeneral,
                            title: `Файл загружен: ${filesName[i]}`,
                            status: 'info',
                            colorScheme: 'facebook'
                        })
                    } else {
                        toast({
                            ...toastGeneral,
                            title: `Пустой файл: ${filesName[i]}`,
                            status: 'warning'
                        })
                        return
                    }
                }  else {
                    toast({
                        ...toastGeneral,
                        title: `Файл уже был загружен: ${filesName[i]}`,
                        status: 'warning'
                    })
                    return
                }
             
            })
        
            setLoadDone(true)
                
        }
        
    }, [readerData])

    const {
        getRootProps,
        getInputProps,
        isDragAccept,
        isDragReject,
        isDragActive
    } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-excel': ['xlsx', 'xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx', 'xlx']
        }
    })

    const dropzoneStyle = useMemo(() => ({
        ...baseStyle,
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
      }), [
        isDragAccept,
        isDragReject
      ]);

    return(
        <>
        
        {
            !isLoad ? (
                <div {...getRootProps({ style: dropzoneStyle, className: componentStyles ? componentStyles : `w-full h-full` })}>
                    <input {...getInputProps()} />
        
                    <div className={`w-full h-full flex flex-col gap-7 justify-center items-center ${!errorData.status ? 'hover:bg-slate-100' : ''} cursor-pointer ${isDragActive ? 'bg-emerald-50 ' : '' } ${isDragReject || errorData.status ? 'bg-red-300' : ''}`}>
                        <div className='opacity-50'>
                            <Image src='./media/excel.png' alt='Excel' h='55px' w='55px' />
                        </div>
                        {
                            !errorData.status ? (
                                <>
                                    {
                                        !isDragReject ? (
                                            <Text color='#888' align='center' fontSize='0.9rem'>{ !isDragActive ? 'Выберите файл с расширением .xls/.xlsx' : 'Перетащите файл с расширением .xls/.xlsx сюда' }</Text>
                                        ) : (
                                            <Text color='red' as='b' align='center' fontSize='0.9rem'>Не поддерживаемый формат файла!</Text>
                                        )
                                    }
                                </>
                            ) : (
                                <Text color='red' as='b' align='center' fontSize='0.9rem'>{ errorData.msg }</Text>
                            )
                        }
                    </div>
                </div>
            ) : (
                <div className={ `${componentStyles ? componentStyles : `w-full h-full`} flex justify-center items-center` }>

                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <Spinner size='lg' color='#0b2638' thickness='1px' />

                        <div className='w-full h-full flex flex-col gap-1.5 justify-center items-center'>
                            {
                                fileReaderStep == 'read' ? (
                                    <Text color='#0b2638' fontSize='0.9rem'>Загрузка данных, подождите..</Text>
                                ) : fileReaderStep == 'processing' ? (
                                    <Text color='#0b2638' fontSize='0.9rem'>Обработка полученных данных: {processedDataCount}/{dataCount}</Text>
                                ) : (
                                    <Text color='#0b2638' fontSize='0.9rem'>Фильтрация данных..</Text>
                                )
                            }

                            {
                                fileReaderStep == 'read' ? (
                                    <Text color='#555' fontSize='0.9rem'>Файл {fileCounter}/{fileCount}</Text>
                                ) : (
                                    <Text color='#555' fontSize='0.9rem'>Файл {readFileCounter}/{fileCount}</Text>
                                )
                            }
                        </div>
                    </div>

                </div>
            )
        }

        </>
    )
}

export default FilesDropzone