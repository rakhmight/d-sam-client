import { FC, useState, useEffect } from 'react'
import { LuFileEdit  } from "react-icons/lu";
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import FilesDropzone from '../../../../sidebar/files-dropzone/FilesDropzone'
import { Text, Icon } from '@chakra-ui/react'
import { PiListBulletsBold } from "react-icons/pi";
import NavBtn from '@/components/ui/buttons/nav-btn/NavBtn';
import { BsPlusCircle } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdUploadFile } from "react-icons/md";
import File from './File/File';

const FilesModal : FC<NavigationModalProps> = ({state, handler}) => {
  const { currentData, processesState, dateStack } = useSelector((state:RootState)=>state)

  const modalData = {
    state,
    handler,
    icon: LuFileEdit,
    title: 'Управление файлами'
  }

  const [mode, setMode] = useState('list')
  const [lastFileUploadState, setLastFileUploadState] = useState(true)

  useEffect(() => {   
    
    if(!lastFileUploadState && processesState.filesUploaded){
      setMode('list')
    }

    setLastFileUploadState(processesState.filesUploaded)
  }, [processesState.filesUploaded])
  
  
  return (
    <ModalLayout { ...modalData } >
      {
        !currentData.files.length || mode == 'download' ? (
          <div className='h-[400px] flex flex-col gap-3'>

            {
              mode == 'download' && (
                <div className='flex justify-between items-center'>
                  <div className='flex items-center gap-1'>
                    <Icon as={MdUploadFile} fontSize='1rem' className='mt-1'></Icon>
                    <Text as='b' fontSize='0.9rem' color='var(--main-color)'>Выберите файлы</Text>
                  </div>
                  
                  <NavBtn
                  tLabel="Отмена"
                  aLabel="Отмена"
                  fs="20px"
                  icon={RiArrowGoBackFill}
                  colorScheme='red'
                  callback={() => setMode('list')}
                  />
                </div>
              )
            }

            <div className={mode == 'download' ? 'h-[350px]' : 'h-full'}>
              <FilesDropzone />
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-3 min-h-[400px] max-h-[400px]'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-1'>
                <Icon as={PiListBulletsBold} fontSize='1rem' className='mt-1'></Icon>
                <Text as='b' fontSize='0.9rem' color='var(--main-color)'>Загруженные файлы:</Text>
              </div>

              <NavBtn
              tLabel="Добавить файлы"
              aLabel="Добавить файлы"
              fs="20px"
              icon={BsPlusCircle}
              colorScheme='facebook'
              callback={() => setMode('download')}
              isDisabled={!dateStack.loadDone}
              />
            </div>

            <div className='h-full flex flex-col gap-1 overflow-y-auto'>
              {
                currentData.files.map(file => (
                  <File id={file.id} name={file.name} key={file.id} />
                ))
              }

            </div>
          </div>
        )
      }
    </ModalLayout>
  );
}

export default FilesModal;
