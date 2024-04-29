import { Dispatch, FC, SetStateAction } from 'react'
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DatePickerProps {
    dataset: DatasetI,
    value: DateValueType,
    changeHandler: Dispatch<SetStateAction<DateValueType>>
}

const DatePicker : FC<DatePickerProps> = ({dataset, value, changeHandler}) => {
    return(
        <Datepicker
        minDate={new Date(Math.min(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items))}
        maxDate={new Date(Math.max(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items))}
        startFrom={new Date(Math.min(...(dataset as Omit<DatasetI, 'items'>&{items:Array<number>}).items))} 
        inputClassName='bg-slate-200 border-[1px] ease-linear duration-100 border-[#aaa] hover:border-[#ccc] w-full rounded-sm focus:ring-0 font-normal px-2.5 py-1.5 text-[0.8rem] text-black'
        placeholder={"Выберите дату"}
        useRange={true}
        value={value}
        onChange={changeHandler}
        displayFormat={"DD.MM.YYYY"}
        primaryColor={"blue"}
        i18n='uz'
        inputId={`${dataset.fileID}-${dataset.fileKey}`}
        />
    )
}

export default DatePicker