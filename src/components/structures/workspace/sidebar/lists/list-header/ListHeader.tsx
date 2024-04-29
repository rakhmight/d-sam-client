import { FC } from 'react'
import { Text, Icon } from '@chakra-ui/react'
import { MdOutlineInsertDriveFile, MdAddCircleOutline } from "react-icons/md";
import NavBtn from '@/components/ui/buttons/nav-btn/NavBtn';
import { useActions } from '@/hooks/useActions/useActions'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ListHeader : FC = () => {
    
    const { addList }  = useActions()
    const {currentData} = useSelector((state:RootState)=>state)

    return(
        <div className='bg-[var(--main-color)] rounded-t py-1.5 px-3 flex justify-between items-center'>
            <div className='flex flex-row items-center gap-1.5'>
                <Icon as={MdOutlineInsertDriveFile} color='#fff'></Icon>
                <Text color='#fff' fontSize='0.9rem' className='uppercase'>Листы</Text>
            </div>

            <NavBtn
            tLabel="Добавить лист"
            aLabel="Добавить лист"
            fs="20px"
            icon={MdAddCircleOutline}
            callback={() => addList()}
            isDisabled={!currentData.files.length}
            />
        </div>
    )
}

export default ListHeader