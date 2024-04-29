import { actions as currentDataActions } from "@/store/current-data/currentData.slice"
import { actions as currentPageActions } from "@/store/current-page/currentPage.slice"
import { actions as processesStateActions } from '@/store/processes-state/processesState.slice'
import { actions as dateStackActions } from '@/store/date-stack/dateStack.slice'
import { bindActionCreators } from "@reduxjs/toolkit"
import { useMemo } from "react"
import { useDispatch } from "react-redux"

const rootActions = {
    ...currentDataActions,
    ...currentPageActions,
    ...processesStateActions,
    ...dateStackActions
}

export const useActions = () => {
    const dispatch = useDispatch()

    return useMemo(() => 
        bindActionCreators(rootActions, dispatch), [dispatch]
    )
}