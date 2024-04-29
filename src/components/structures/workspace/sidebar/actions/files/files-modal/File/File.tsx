import { FC } from 'react'
import { Text, Icon } from '@chakra-ui/react'
import { MdOutlineInsertDriveFile } from "react-icons/md"
import DeleteFile from './delete-file/DeleteFile'

interface FileProps {
    name: string,
    id: number
}

const File : FC<FileProps> = ({ name, id }) => {
    return(
        <div className='flex flex-row items-center justify-between gap-4 py-1'>
            <div className='flex items-center gap-2'>
                <Icon as={MdOutlineInsertDriveFile} fontSize='lg' color="var(--main-color)"></Icon>
                <Text fontSize='0.9rem'>{ name }</Text>
            </div>

            <div>
                <DeleteFile id={id} name={name} />
            </div>
        </div>
    )
}

export default File