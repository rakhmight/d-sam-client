import { createSlice } from "@reduxjs/toolkit";

const initialState:CurrentPageI = {
    page: 1
}

export const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setCurrentPage: (state, data:reducerBase<{id:number}>) => { 
            state.page = data.payload.id
        }
    }
})

export const { actions, reducer } = currentPageSlice