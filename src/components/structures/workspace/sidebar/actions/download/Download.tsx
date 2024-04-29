import { FC } from 'react'
import NavBtn from "@/components/ui/buttons/nav-btn/NavBtn"
import DownloadModal from './download-modal/DownloadModal'
import { useDisclosure } from "@chakra-ui/react"
import { MdFileDownload } from "react-icons/md"
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Download : FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentData, dateStack } = useSelector((state:RootState)=>state)

  return (
    <>
     
        <NavBtn
        tLabel="Скачать"
        aLabel="Скачать"
        fs="20px"
        icon={MdFileDownload}
        callback={onOpen}
        colorScheme='facebook'
        border='1px dashed var(--main-color)'
        isDisabled={!currentData.files.length || !dateStack.loadDone}
        />

      <DownloadModal state={isOpen} handler={onClose} />
    </>
  );
}

export default Download