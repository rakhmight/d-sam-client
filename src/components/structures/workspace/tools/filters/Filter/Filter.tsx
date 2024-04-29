import { FC, useEffect, memo, useState } from 'react'
import CustomSelect from '../../custom-select/CustomSelect';
import { DataTypes } from '@/store/current-data/enums';
import {
    Text,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    IconButton,
    Checkbox,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Tooltip
} from '@chakra-ui/react'
import { useActions } from '@/hooks/useActions/useActions'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import DatePicker from '../../date-picker/DatePicker';
import { DateValueType } from 'react-tailwindcss-datepicker';

interface FilterProps {
    dataset: DatasetI,
    page: number
}

const Filter : FC<FilterProps> = memo(({ dataset, page }) => {

    const { currentData, currentPage } = useSelector((state:RootState)=>state)
    const { setListFilter, removeListFilter } = useActions()
    
    const [selectedDate, setSelectedDate] = useState<DateValueType>(null)
    const [selectedData, setSelectedData] = useState<Array<SelectItemBase>>([])
    const [selectedRange, setSelectedRange] = useState<Array<number>>([0,0])
    const [includeEmptyCell, setIncludeEmptyCell] = useState(false)

    const [rangeSelectingCount, setRangeSelectingCount] = useState(0)
    const [openTooltip, setOpenTooltip] = useState<boolean>(false)

    useEffect(() => {

        if(selectedDate){
            if(selectedDate.startDate && selectedDate.endDate){
                const filter:ListFilterI = {
                    fileID: dataset.fileID,
                    fileKey: dataset.fileKey,
                    filter: [selectedDate.startDate, selectedDate.endDate],
                    type: dataset.type,
                    includeEmptyCell
                }

                setListFilter({filter, id: page })
            } else removeListFilter({id: page, fileID: dataset.fileID, fileKey: dataset.fileKey})
        }
        
    }, [selectedDate])
    
    useEffect(() => {
        if(selectedData){
            const filter:ListFilterI = {
                fileID: dataset.fileID,
                fileKey: dataset.fileKey,
                filter: selectedData.map(v => v.value),
                type: dataset.type,
                includeEmptyCell
            }

            setListFilter({filter, id: page })
        }
        
    }, [selectedData])

    useEffect(() => {
        if(selectedRange.length){          
            
            setRangeSelectingCount( count => count + 1)
            if(rangeSelectingCount > 1 || rangeSelectingCount == 1 && selectedRange[0] > 0 || rangeSelectingCount == 1 && selectedRange[1] > 0){
                const filter:ListFilterI = {
                    fileID: dataset.fileID,
                    fileKey: dataset.fileKey,
                    filter: selectedRange,
                    type: dataset.type,
                    includeEmptyCell,
                    isRanged: true
                }
                
                setListFilter({filter, id: page })
                
            }
    
        }
        
    }, [selectedRange])

    useEffect(()=> {
            const targetList= currentData.lists.find(list => list.id === currentPage.page)
    
            if(targetList){
                const indexList = currentData.lists.indexOf(targetList)
                const targetFilter = currentData.lists[indexList].filters.find(filter => filter.fileID == dataset.fileID && filter.fileKey == dataset.fileKey)
                
                if(targetFilter){
                    const filter = {
                        ...targetFilter,
                        includeEmptyCell
                    }
                    setListFilter({filter, id: page })
                }else {                
                    if(includeEmptyCell){                    
                        const filter:ListFilterI = {
                            fileID: dataset.fileID,
                            fileKey: dataset.fileKey,
                            filter: [],
                            type: dataset.type,
                            includeEmptyCell,
                            isRanged: dataset.type == DataTypes.Number && dataset.items.length > 20 ? true : false
                        }
                        setListFilter({filter, id: page })
                    } else {                    
                        removeListFilter({id: page, fileID: dataset.fileID, fileKey: dataset.fileKey})
                    }
        
                }
            }
    }, [includeEmptyCell])

    useEffect(() => {             
        if(currentData.lists.length){
            const targetList = currentData.lists.find(list => list.id === currentPage.page)

            if(targetList){
                const indexList = currentData.lists.indexOf(targetList)
                const targetFilter = currentData.lists[indexList].filters.find(filter => filter.fileKey == dataset.fileKey && filter.fileID == dataset.fileID)

                if(targetFilter){                    
                    if(targetFilter.filter.length){
                        
                        if(targetFilter.type == DataTypes.Date){
                            setSelectedDate({ startDate: (targetFilter as Omit<ListFilterI, 'filter'>&{ filter: Array<string | Date> }).filter[0],  endDate: (targetFilter as Omit<ListFilterI, 'filter'>&{ filter: Array<string | Date> }).filter[1] })
                        } else if(targetFilter.type == DataTypes.String || targetFilter.type == DataTypes.Telephone || dataset.type == DataTypes.Number && dataset.items.length <= 20){
                            setSelectedData(targetFilter.filter.map(v => { return { label: v, value: v } }))
                        } else if(targetFilter.type == DataTypes.Number && dataset.items.length > 20){
                            setSelectedRange((targetFilter as Omit<ListFilterI, 'filter'>&{ filter: Array<number> }).filter)
                        }
                        
                        setIncludeEmptyCell(targetFilter.includeEmptyCell)
                    } else {
                        if(dataset.type == DataTypes.String || dataset.type == DataTypes.Telephone || dataset.type == DataTypes.Number && dataset.items.length <= 20){
                            setSelectedData([])
                        } else if(dataset.type == DataTypes.Date){
                            setSelectedDate({ startDate: null, endDate: null})
                        } else if(dataset.type == DataTypes.Number && dataset.items.length > 20){
                            setSelectedRange([0, 0])
                            setRangeSelectingCount(0)
                        }
                        
                        setIncludeEmptyCell(false)
                    }
                } else {
                    if(dataset.type == DataTypes.String || dataset.type == DataTypes.Telephone || dataset.type == DataTypes.Number && dataset.items.length <= 20){
                        setSelectedData([])
                    } else if(dataset.type == DataTypes.Date){
                        setSelectedDate({ startDate: null, endDate: null})
                    } else if(dataset.type == DataTypes.Number && dataset.items.length > 20){
                        setSelectedRange([0, 0])
                        setRangeSelectingCount(0)
                    }
                    
                    setIncludeEmptyCell(false)
                }
            }
        }
        
    }, [currentPage])

    const canceledRange = () => {
        setRangeSelectingCount(0)
        setSelectedRange([0, 0])
        removeListFilter({id: page, fileID: dataset.fileID, fileKey: dataset.fileKey})
    }
    
    return(
        <tr key={`${dataset.fileKey}-${dataset.fileID}`}>
            <td className='lim-txt max-w-[200px] pr-3'>
                <Text fontSize='0.9rem' color='var(--main-color)' as='b'>{dataset.fileKey}</Text>
            </td>

            <td className='w-full flex items-center gap-2'>
                {
                    dataset.type == DataTypes.String || dataset.type == DataTypes.Number && dataset.items.length <= 20 || dataset.type == DataTypes.Telephone ? (
                        <CustomSelect
                        selectedItems={selectedData}
                        onChangeHandler={(e:Array<SelectItemBase>) => setSelectedData(e)}
                        selectItems={dataset.items.filter(item => item).map(item => { return { label: item, value: item } })}
                        />
                    ) : dataset.type == DataTypes.Number && dataset.items.length > 20 ? (
                        <div className='flex justify-between items-center w-full'>
                            <div className='flex gap-5 w-[90%]'>
                                <RangeSlider
                                min={Math.min(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items)}
                                max={Math.max(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items)}
                                colorScheme='facebook'
                                zIndex={'0'}
                                value={selectedRange}
                                onChange={(e) => setSelectedRange(e)}
                                >
                                    <RangeSliderTrack bgColor='#999'>
                                        <RangeSliderFilledTrack />
                                    </RangeSliderTrack>
                                    <RangeSliderThumb boxSize={3} index={0} />
                                    <RangeSliderThumb boxSize={3} index={1} />
                                </RangeSlider>

                                <div className='flex gap-2 min-w-[200px]'>

                                    <div className='flex items-center gap-1'>
                                        <Text fontSize='0.85rem'>от:</Text>

                                        <NumberInput
                                        size='sm'
                                        min={Math.min(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items)}
                                        max={selectedRange[1]==0 ? Math.max(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items) : selectedRange[1]}
                                        value={selectedRange[0]}
                                        onChange={(e) => setSelectedRange(items => !Number.isNaN(+e) ? [+e, items[1]] : [0, items[1]])}
                                        className='w-[80px] border-[#aaa]'
                                        isInvalid={false}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper height='32px'>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </div>

                                    <div className='flex items-center gap-1'>
                                        <Text fontSize='0.85rem'>до:</Text>

                                        <NumberInput
                                        size='sm'
                                        min={selectedRange[0]==0 ? Math.min(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items) : selectedRange[0]}
                                        max={Math.max(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items)}
                                        value={selectedRange[1]}
                                        onChange={(e) => setSelectedRange(items => !Number.isNaN(+e) ? [items[0], +e] : [items[0], 0])}
                                        className='w-[80px] border-[#aaa]'
                                        isInvalid={false}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper height='32px'>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </div>
                                </div>
                            </div>

                            {
                                selectedRange[0] > 0 || selectedRange[1] > 0 || rangeSelectingCount > 1 ? (
                                    <IconButton
                                    backgroundColor='#e2e8f0'
                                    aria-label='отмена'
                                    fontSize='1.1rem'
                                    size='xs'
                                    icon={<MdClose color='var(--main-color)' />}
                                    onClick={() => canceledRange()}
                                    />
                                ) : (<></>)
                            }

                        </div>
                    ) : (
                        <DatePicker
                        dataset={dataset}
                        value={selectedDate}
                        changeHandler={setSelectedDate}
                        />
                    )
                }

                <div
                className='pr-0.5 flex items-center'
                onMouseEnter={() => setOpenTooltip(true)}
                onMouseLeave={() => setOpenTooltip(false)}
                >
                    <Tooltip
                    label='Учитывать пустые ячейки?'
                    bg='#0b2638'
                    placement='right'
                    id={`${dataset.fileID}-${dataset.fileKey}`}
                    isOpen={openTooltip}
                    >
                        <Checkbox
                        size='md'
                        colorScheme='facebook'
                        borderColor='#aaa'
                        isChecked={includeEmptyCell}
                        onChange={(e) => setIncludeEmptyCell(e.target.checked)}
                        />
                    </Tooltip>
                </div>
            </td>
        </tr>
    )
})

export default Filter