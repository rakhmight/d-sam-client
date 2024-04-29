import { FC, PropsWithChildren } from 'react'

const WorkspaceLayout : FC<PropsWithChildren<unknown>> = ({ children }) => {
    return(
        <div className='main bg-slate-100 grid grid-cols-[300px_auto] p-4 gap-[40px]'>
            {children}
        </div>
    )
}

export default WorkspaceLayout