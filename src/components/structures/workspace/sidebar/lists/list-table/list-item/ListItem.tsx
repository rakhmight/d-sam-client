import { FC } from 'react'
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { Text, Icon } from '@chakra-ui/react'
import DeleteList from './delete-list/DeleteList'
import { useActions } from '@/hooks/useActions/useActions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface ListItemProps {
    name: string,
    id: number
}

const ListItem : FC<ListItemProps> = ({ name, id }) => {

    const { currentPage } = useSelector((state:RootState)=>state)

    const { setCurrentPage } = useActions()

    const selectList = () => {
        setCurrentPage({id})
    }

    return(
        <div
        className={`flex flex-row items-center justify-between px-3 gap-4 cursor-pointer hover:bg-[#0b263817] py-0.5 border-b-[1px] border-[#0b26382f] ${currentPage.page == id ? 'border-l-[10px] border-l-[var(--additionally-color)]' : '' } `}
        onClick={selectList}
        >
            <div className='flex items-center gap-2'>
                <Icon as={MdOutlineInsertDriveFile} fontSize='lg' color="var(--main-color)"></Icon>
                <Text fontSize='0.9rem'>{ name }</Text>
            </div>

            <div>
                <DeleteList id={id} />
            </div>
        </div>
    )
}

export default ListItem