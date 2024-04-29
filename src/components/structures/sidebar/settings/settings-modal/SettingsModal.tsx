import { FC } from 'react'
import { TbSettings } from "react-icons/tb"
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'

const SettingsModal : FC<NavigationModalProps> = ({state, handler}) => {
  const modalData = {
    state,
    handler,
    icon: TbSettings,
    title: 'Настройки'
  }
  
  return (
    <ModalLayout { ...modalData } >
      <p>log</p>
      <p>log</p>
    </ModalLayout>
  );
}

export default SettingsModal;
