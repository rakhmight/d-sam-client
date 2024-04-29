import { createSlice } from "@reduxjs/toolkit";

const initialState:CurrentDataI = {
    files: [],
    filesCounter: 0,
    listsCounter: 0,
    lists: []
}

export const currentDataSlice = createSlice({
    name: 'currentData',
    initialState,
    reducers: {
        addCurrentData: (state, data:reducerBase<Array<Pick<DataFileI, 'name'>&{fileKeys:Array<string>, data:Array<Object>, datasets:Array<Omit<DatasetI, 'fileID'>>}>>) => {
            if(Array.isArray(data.payload)){
                if(data.payload.length == 1){
                    if(data.payload[0].data.length){

                        const fileID = state.filesCounter + 1
                        const fileKeys:Array<KeyI> = data.payload[0].fileKeys.map(key => { return { fileKey: key, fileID } })

                        const file:DataFileI = {
                            data: data.payload[0].data.map( d => { return { fileID, ...d } }),
                            datasets: data.payload[0].datasets.map( d => { return { fileID, ...d } }),
                            id: fileID,
                            fileKeys,
                            name: data.payload[0].name
                        }

                        state.files.push(file)
                        state.filesCounter += 1

                        if(!state.lists.length){
                            state.lists.push({
                                filters: [],
                                sorts: [],
                                filesKeys: file.fileKeys.map(key => { return { ...key, isInclude: true } }),
                                name: 'Лист 1',
                                id: 1
                            })
                            state.listsCounter += 1
                        } else{
                            state.lists = state.lists.map(list => {
                                const fileKeys = file.fileKeys.map(key => { return { ...key, isInclude: true } })
                                return {
                                    ...list,
                                    filesKeys: [ ...fileKeys, ...list.filesKeys ]
                                }
                            })
                        }

                    } else throw new Error('file-empty')
                } else if(data.payload.length > 1){

                    // проверка на empty
                    let fileCounter = 0
                    const files: Array<DataFileI> = []
                    let fileLastID = state.filesCounter

                    data.payload.forEach(fileData => {
                        if(fileData.data.length > 1) fileCounter++
                        
                        const fileID = fileLastID + 1
                        const fileKeys:Array<KeyI> = fileData.fileKeys.map(key => { return { fileKey: key, fileID } })

                        const file:DataFileI = {
                            data: fileData.data.map( d=> { return { fileID, ...d } }),
                            datasets: fileData.datasets.map( d => { return { fileID, ...d } }),
                            id: fileID,
                            fileKeys,
                            name: fileData.name
                        }

                        files.push(file)
                        fileLastID++
                    })

                    if(fileCounter == data.payload.length){
                        state.files.push(...files)
                        state.filesCounter = fileLastID

                        const fileKeys:Array<ListKeyI> = []
                        files.forEach((file) => {
                            let fileKeys = file.fileKeys.map(key => { return { ...key, isInclude: true } })
                            fileKeys.push(...fileKeys)
                        })

                        if(!state.lists.length){

                            state.lists.push({
                                filters: [],
                                sorts: [],
                                filesKeys: fileKeys,
                                name: 'Лист 1',
                                id: 1
                            })
                            state.listsCounter += 1
                        } else {
                            state.lists = state.lists.map(list => {
                                return {
                                    ...list,
                                    filesKeys: [ ...fileKeys, ...list.filesKeys ]
                                }
                            })
                        }
                    } else throw new Error('files-empty')

                } else throw new Error('file-bad')
                
            } else throw new Error('file-bad')
        },

        removeFromCurrentData: (state, data:reducerBase<Array<number>>) => {
            data.payload.forEach(fileID => {
                const fileTarget = state.files.find( file => file.id == fileID)

                if(fileTarget){
                    const fileIndex = state.files.indexOf(fileTarget)
                    state.files.splice(fileIndex, 1)

                    const listKeys = Object.keys(state.lists[0])
                    state.lists.forEach((list: ListI) => {
                        const listIndex = state.lists.indexOf(list)

                        listKeys.forEach(listKey => {
                            if(listKey == 'filters' || listKey == 'sorts' || listKey == 'filesKeys'){
                                const listKeyTargets = list[listKey].filter( el => el.fileID == fileID )

                                if(listKeyTargets.length){
                                    listKeyTargets.forEach(listKeyTarget => {
                                        if(listKey == 'filters'){
                                            const listKeyIndex = list[listKey].indexOf(listKeyTarget as ListFilterI)
                                            state.lists[listIndex][listKey].splice(listKeyIndex, 1)
                                        }else if(listKey == 'sorts'){
                                            const listKeyIndex = list[listKey].indexOf(listKeyTarget as ListSortI)
                                            state.lists[listIndex][listKey].splice(listKeyIndex, 1)
                                        }else if(listKey == 'filesKeys'){
                                            const listKeyIndex = list[listKey].indexOf(listKeyTarget as ListKeyI)
                                            state.lists[listIndex][listKey].splice(listKeyIndex, 1)
                                        }
                                    })
                                }
                            }
                        })
                    })
                }
            })

            if(!state.files.length){
                state.lists = []
                state.listsCounter = 0
                state.filesCounter = 0
            }
        },

        replaceFilesData: (state, data:reducerBase<Array<DataFileI>>) => {
            console.log(data);
            
            data.payload.forEach(file => {
                const fileTarget = state.files.find(f => f.name == file.name)
                if(fileTarget){
                    const fileIndex = state.files.indexOf(fileTarget)
                    state.files[fileIndex].data = file.data
                }
            })

            console.log(state);
            
        },

        addList: (state) => {
            const filesKeys:Array<ListKeyI> = []
            state.files.forEach(file => {
                const fileKeys = file.fileKeys.map(fileKey => {
                    return {
                        ...fileKey,
                        isInclude: true
                    }
                })

                filesKeys.push(...fileKeys)
            })

            const listID = state.listsCounter + 1
            state.lists.push({
                filesKeys,
                filters: [],
                sorts: [],
                name: `Лист ${listID}`,
                id: listID
            })
            state.listsCounter += 1
        },
        removeList: (state, data:reducerBase<{ id: number }>) => {
            const listTarget = state.lists.find(list => list.id == data.payload.id)

            if(listTarget){
                const listIndex = state.lists.indexOf(listTarget)
                state.lists.splice(listIndex, 1)
            }

            if(!state.lists.length){
                state.listsCounter = 0
            }
        },

        setListFilter: (state, data:reducerBase<{ id: number, filter:ListFilterI }>) => {
            const listTarget = state.lists.find(list => list.id == data.payload.id)

            if(listTarget){
                const listIndex = state.lists.indexOf(listTarget)
                const filterTarget = state.lists[listIndex].filters.find(filter => filter.fileID == data.payload.filter.fileID && filter.fileKey == data.payload.filter.fileKey)

                if(filterTarget){
                    const filterIndex = state.lists[listIndex].filters.indexOf(filterTarget)

                    if(data.payload.filter.filter.length){
                        state.lists[listIndex].filters[filterIndex] = data.payload.filter
                    } else state.lists[listIndex].filters.splice(filterIndex, 1)
                } else {
                    if(data.payload.filter.filter.length || data.payload.filter.includeEmptyCell) state.lists[listIndex].filters.push(data.payload.filter)
                }
            }
        },

        removeListFilter:  (state, data:reducerBase<{ id: number, fileID:number, fileKey: string }>) => {
            const listTarget = state.lists.find(list => list.id == data.payload.id)
            if(listTarget){
                const listIndex = state.lists.indexOf(listTarget)
                const filterTarget = state.lists[listIndex].filters.find(filter => filter.fileID == data.payload.fileID && filter.fileKey == data.payload.fileKey)

                if(filterTarget){
                    const filterIndex = state.lists[listIndex].filters.indexOf(filterTarget)
                    state.lists[listIndex].filters.splice(filterIndex, 1)
                }
            }
        },

        setListSort: (state, data:reducerBase<{ id: number, sorts:Array<ListSortI> }>) => {
            const listTarget = state.lists.find(list => list.id == data.payload.id)

            if(listTarget){
                const listIndex = state.lists.indexOf(listTarget)
                state.lists[listIndex].sorts.push(...data.payload.sorts)
            }
        },

        setListKeys: (state, data:reducerBase<{ id: number, filesKeys:Array<ListKeyI> }>) => {
            const listTarget = state.lists.find(list => list.id == data.payload.id)

            if(listTarget){
                const listIndex = state.lists.indexOf(listTarget)
                state.lists[listIndex].filesKeys.push(...data.payload.filesKeys)
            }
        },

        clearCurrentData(state){
            state.files = []
            state.filesCounter = 0
            state.listsCounter = 0
            state.lists = []
        }
    }
})

export const { actions, reducer } = currentDataSlice