import { FC } from 'react'
import { MdFileDownload } from "react-icons/md"
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { createExcelFile } from '@/plugins/excel/excel'
import { downloadAsFile } from '@/utils/downloadAsFile'
import { DataTypes } from '@/store/current-data/enums'
import { Button, ToastPosition, useToast } from '@chakra-ui/react'

const DownloadModal : FC<NavigationModalProps> = ({state, handler}) => {

  const { currentData, dateStack } = useSelector((state:RootState)=>state)

  const modalData = {
    state,
    handler,
    icon: MdFileDownload,
    title: 'Скачать результат'
  }
  
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

  const downloadResult = async  () => {
    if(!dateStack.loadDone){
      toast({
        ...toastGeneral,
        title: `Обработка данных ещё не завершена`,
        status: 'error',
        colorScheme: 'facebook'
      })
      return
    }

    if(currentData.lists.length) {
      const sheetsData:Array<SheetWithColumn> = []

      const filesData:Array<DataI> = []
      currentData.files.forEach(file => {

        // TODO: сериализация даты
        const dateTypeKeys = file.datasets.filter( dataset => dataset.type == DataTypes.Date )

        if(dateTypeKeys.length){
          const fileData: Array<DataI> = file.data.map( data => {
            let newData = { ...data }
            dateTypeKeys.forEach( dateTypeKey => {
              newData[dateTypeKey.fileKey] = new Date(newData[dateTypeKey.fileKey] as number )
            })

            return newData
          })

          filesData.push(...fileData)
        } else filesData.push(...file.data)

      })
      
      currentData.lists.forEach(list => {
        let listResult:Array<Omit<DataI, 'fileID'>> = []

        if(list.filters.length){

          list.filters.forEach(filter => {
            
            const listData:DataI[] = []
            filesData.forEach(data => {
              if(!filter.includeEmptyCell){
                if(data.fileID === filter.fileID){
                  if(filter.type == DataTypes.Date){
  
                    if((data[filter.fileKey] as Date) >= new Date(filter.filter[0]) && (data[filter.fileKey] as Date) <= new Date(filter.filter[1])) listData.push(data)
  
                  } else if(filter.type == DataTypes.String || filter.type == DataTypes.Telephone || filter.type == DataTypes.Number && !filter.isRanged){
      
                    if(filter.filter.includes(data[filter.fileKey] as string)) listData.push(data)
  
                  } else if(filter.type == DataTypes.Number && filter.isRanged){                  
                    if(+(data[filter.fileKey] as number) >= (filter.filter[0] as number) && +(data[filter.fileKey] as number) <= (filter.filter[1] as number)) listData.push(data)
                  }
                }
              } else {
                if(data[filter.fileKey] === undefined) listData.push(data)
              }
            })

            console.log(listData);
            listResult = listData.map(listDataElm => {
              const data:Omit<DataI, 'fileID'> = { ...listDataElm }
              delete data.fileID
              return data
            })
          })

        }

        if(listResult.length) {
          const listKeys = Object.keys(listResult[0])
          const listColumns:Array<SheetColumns> = listKeys.map( listKey => {
            return {
              header: listKey,
              items: []
            }
          })

          listResult.forEach((dataElm:Omit<DataI, 'fileID'>) => {
            listColumns.forEach((listColumn) => {
              listColumns[listColumns.indexOf(listColumn)].items.push(dataElm[listColumn.header] as string)
            })
          })

          sheetsData.push({
            name: list.name,
            columns: listColumns
          })
        }
      })

      if(sheetsData.length){
        const excelBlob = await createExcelFile(sheetsData)
        downloadAsFile(excelBlob, 'Результат.xlsx')
      } else toast({
        ...toastGeneral,
        title: `Выборка не удалась (0 элементов)`,
        status: 'warning',
        colorScheme: 'orange'
      })
    }
  }
  
  return (
    <ModalLayout { ...modalData } >
      <p>log</p>
      <p>log</p>

      <Button onClick={downloadResult}></Button>
    </ModalLayout>
  );
}

export default DownloadModal;
