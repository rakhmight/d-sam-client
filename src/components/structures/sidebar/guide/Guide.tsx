import { FC } from 'react'
import NavBtn from "@/components/ui/buttons/nav-btn/NavBtn";
import GuideModal from "./guide-modal/GuideModal";
import { useDisclosure } from "@chakra-ui/react";
import { MdOutlineBook } from "react-icons/md";

const Guide : FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <NavBtn
        tLabel="Инструкция"
        aLabel="Инструкция"
        fs="20px"
        icon={MdOutlineBook}
        callback={onOpen}
      />

      <GuideModal state={isOpen} handler={onClose} />
    </>
  );
}

export default Guide