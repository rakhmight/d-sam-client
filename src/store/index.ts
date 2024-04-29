import { configureStore, combineReducers } from '@reduxjs/toolkit'

import { reducer as currentDataReducer } from './current-data/currentData.slice'
import { reducer as currentPageReducer } from './current-page/currentPage.slice'
import { reducer as processesStateReducer } from './processes-state/processesState.slice'
import { reducer as dateStackReducer } from './date-stack/dateStack.slice'

const reducers = combineReducers({
    currentData: currentDataReducer,
    currentPage: currentPageReducer,
    processesState: processesStateReducer,
    dateStack: dateStackReducer
})

export const store = configureStore({
    reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>