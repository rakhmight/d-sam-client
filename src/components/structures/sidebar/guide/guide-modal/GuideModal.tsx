import { FC } from 'react'
import { MdOutlineBook } from "react-icons/md";
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'

const GuideModal : FC<NavigationModalProps> = ({state, handler}) => {
  const modalData = {
    state,
    handler,
    icon: MdOutlineBook,
    title: 'Инструкция'
  }
  
  return (
    <ModalLayout { ...modalData } >
      <p>log</p>
      <p>log</p>
    </ModalLayout>
  );
}

export default GuideModal;
