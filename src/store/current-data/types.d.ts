declare interface CurrentDataI {
    files: Array<DataFileI>,
    filesCounter: number,
    listsCounter: number,
    lists: Array<ListI>
}

declare interface DataFileI {
    data: Array<DataI>,
    fileKeys: Array<KeyI>,
    datasets: Array<DatasetI>,
    name: string,
    id: number
}

declare interface DataI {
    fileID: number,
    [key: string | number | Date]: unknown
}

declare interface DataObject {
    [key: string | number | Date]: string | number | Date
}

declare interface KeyI {
    fileKey: string,
    fileID: number
}

declare interface DatasetI extends KeyI {
    items: Array<string | Date | number>
    type: import('./enums').DataTypes
}

declare interface ListI {
    filters: Array<ListFilterI>,
    sorts: Array<ListSortI>,
    filesKeys: Array<ListKeyI>,
    name: string,
    id: number
}

declare interface reducerBase<T> {
    payload: T
}

declare interface ListFilterI extends KeyI {
    filter: Array<string | Date | number>,
    type: import('./enums').DataTypes,
    includeEmptyCell: boolean,
    isRanged?: boolean
}

declare interface ListSortI extends KeyI{
    mode: import('./enums').SortMode
}

declare interface ListKeyI extends KeyI {
    isInclude: boolean
}