import { FC } from 'react'
import NavBtn from "@/components/ui/buttons/nav-btn/NavBtn"
import { useDisclosure } from "@chakra-ui/react"
import { MdDeleteOutline } from "react-icons/md"
import DeleteFileModal from './delete-file-modal/DeleteFileModal'

interface DeleteFileProps {
    name: string,
    id: number
}

const DeleteFile : FC<DeleteFileProps> = ({ id, name }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return(
        <>        
            <NavBtn
            tLabel="Удалить файл"
            aLabel="Удалить файл"
            fs="20px"
            icon={MdDeleteOutline}
            colorScheme='blackAlpha'
            callback={onOpen}
            />
    
          <DeleteFileModal state={isOpen} handler={onClose} id={id} name={name} />
        </>
    )
}

export default DeleteFile