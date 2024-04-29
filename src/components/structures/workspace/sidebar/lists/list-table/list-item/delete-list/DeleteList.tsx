import { FC } from 'react'
import NavBtn from "@/components/ui/buttons/nav-btn/NavBtn"
import DeleteListModal from './delete-list-modal/DeleteListModal'
import { useDisclosure } from "@chakra-ui/react"
import { MdDeleteOutline } from "react-icons/md"

interface DeleteListProps {
  id: number
}

const DeleteList : FC<DeleteListProps> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>        
        <NavBtn
        tLabel="Удалить лист"
        aLabel="Удалить лист"
        fs="20px"
        icon={MdDeleteOutline}
        colorScheme='blackAlpha'
        callback={onOpen}
        />

      <DeleteListModal state={isOpen} handler={onClose} id={id} />
    </>
  );
}

export default DeleteList