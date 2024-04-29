import { createSlice } from "@reduxjs/toolkit";

const initialState:ProcessesStateI = {
    filesUploaded: true
}

export const processesStateSlice = createSlice({
    name: 'processesState',
    initialState,
    reducers: {
        switchFilesUploaded: (state, data:reducerBase<{state: boolean}>) => {
            state.filesUploaded = data.payload.state
        }
    }
})

export const { actions, reducer } = processesStateSlice