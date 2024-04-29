import { FC } from 'react'
import { MdOutlineSave } from "react-icons/md";
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'

const SessionsModal : FC<NavigationModalProps> = ({state, handler}) => {
  const modalData = {
    state,
    handler,
    icon: MdOutlineSave,
    title: 'Сохранения'
  }
  
  return (
    <ModalLayout { ...modalData } >
      <p>log</p>
      <p>log</p>
    </ModalLayout>
  );
}

export default SessionsModal;
