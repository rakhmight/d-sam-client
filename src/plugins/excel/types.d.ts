interface SheetColumns{
    header: string;
    items: Array<string | number | Date>
}

declare interface SheetWithColumn{
    name: string,
    columns: Array<SheetColumns>
}