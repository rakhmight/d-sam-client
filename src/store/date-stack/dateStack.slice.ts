import { createSlice } from "@reduxjs/toolkit";

const initialState:DateStackI = {
    stack: [],
    loadDone: true,
    fileCount: 0,
    readFileCount: 0
}

export const dateStackSlice = createSlice({
    name: 'dateStack',
    initialState,
    reducers: {
        addToStack: (state, data:reducerBase<Array<{ fileName: string, fileKey: string }>>) => {
            data.payload.forEach( elm => {
                if(!state.stack.find(el => el.fileName == elm.fileName)){
                    state.stack.push(elm)
                }
            })
        },
        
        switchDateStackLoading: (state, data:reducerBase<boolean>) => {
            if(!data.payload){
                state.loadDone = false
            } else {
                state.loadDone = true
                state.stack = []
            }
        },

        setStackFileCount: (state, data:reducerBase<number>) => {
            state.fileCount = data.payload
        },

        setStackReadFileCount: (state, data:reducerBase<number>) => {
            state.readFileCount = data.payload
        },
    }
})

export const { actions, reducer } = dateStackSlice