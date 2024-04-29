import { FC } from 'react'
import NavBtn from "@/components/ui/buttons/nav-btn/NavBtn"
import FilesModal from './files-modal/FilesModal';
import { useDisclosure } from "@chakra-ui/react";
import { LuFileEdit  } from "react-icons/lu";

const Files : FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <NavBtn
        tLabel="Управление файлами"
        aLabel="Управление файлами"
        fs="20px"
        icon={LuFileEdit}
        callback={onOpen}
        colorScheme='facebook'
        border='1px dashed var(--main-color)'
        />

      <FilesModal state={isOpen} handler={onClose} />
    </>
  );
}

export default Files