import { FC } from 'react'
import NavBtn from "@/components/ui/buttons/nav-btn/NavBtn";
import SessionsModal from "./sessions-modal/SessionsModal";
import { useDisclosure } from "@chakra-ui/react";
import { MdOutlineSave } from "react-icons/md";

const Sessions : FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBtn
        tLabel="Сохранения"
        aLabel="Сохранения"
        fs="20px"
        icon={MdOutlineSave}
        callback={onOpen}
      />

      <SessionsModal state={isOpen} handler={onClose} />
    </>
  );
}

export default Sessions