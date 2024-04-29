import { FC } from 'react'
import ListHeader from './list-header/ListHeader';
import ListTable from './list-table/ListTable';

const List : FC = () => {
    return(
        <div className='flex flex-col'>
            <ListHeader />
            <ListTable />
        </div>
    )
}

export default List