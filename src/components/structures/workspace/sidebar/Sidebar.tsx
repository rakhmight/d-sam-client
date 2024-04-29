import { FC } from 'react'
import List from './lists/List'
import Actions from './actions/Actions'

const Sidebar : FC = () => {
    return(
        <div className='flex flex-col gap-[30px] w-full'>
            <List />
            <Actions />
        </div>
    )
}

export default Sidebar