import { FC, PropsWithChildren } from 'react'

const ToolsLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {
    return(
        <div className='min-h-[78vh] max-h-[78vh] overflow-y-auto overflow-x-hidden'>
            { children }
        </div>
    )
}

export default ToolsLayout