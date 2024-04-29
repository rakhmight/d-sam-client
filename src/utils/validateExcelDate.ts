import { ExcelDateToJSDate } from "./excelDateToJSDate"

export function validateExcelDate(item: number | string | Date):number|string|Date{
    if(typeof +item == 'number' && !isNaN(+item)){ 
        const date = new Date(+item)

        if(date.getFullYear() > 2000){
            return item
        } else {  
            if(item !== undefined && +item!=0) return Date.parse((ExcelDateToJSDate(+item).toString()))
            else return item
        }
    } else{
        if(typeof item == 'string'){
            return Date.parse(item)
        } else {
            return Date.parse(item.toString())
        }
    }
}