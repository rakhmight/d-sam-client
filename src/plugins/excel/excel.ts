import * as ExcelJS from 'exceljs'

export async function createExcelFile(sheets:Array<SheetWithColumn>):Promise<Blob>{
  const workbook = new ExcelJS.Workbook()

  sheets.forEach(sheet => {
    const worksheet = workbook.addWorksheet(sheet.name)

    const workSheetColumns = sheet.columns.map(column => { return { header: column.header, key: column.header, width: 32 } })
    worksheet.columns = workSheetColumns

    sheet.columns.forEach(column => {
        const targetColumn = worksheet.getColumn(column.header)
        targetColumn.alignment = { vertical: 'justify', horizontal: 'left' };
        targetColumn.values = [column.header, ...column.items]
    })
  })

  const arrayBuffer = await workbook.xlsx.writeBuffer()
  return new Blob([arrayBuffer], { type: 'application/octet-stream' })
}