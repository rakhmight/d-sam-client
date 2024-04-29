import { FC } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'
import { RiFileShredLine } from "react-icons/ri";
import { Button, Icon, Text } from '@chakra-ui/react';
import { useActions } from '@/hooks/useActions/useActions'

interface DeleteFileModalProps {
    name: string,
    id: number
}

const DeleteFileModal : FC<NavigationModalProps&DeleteFileModalProps> = ({state, handler, id, name}) => {
    const modalData = {
      state,
      handler,
      icon: MdDeleteOutline,
      title: 'Вы уверены, что хотите удалить файл?',
      titleColor: 'var(--red-color)'
    }

    const { removeFromCurrentData } = useActions()

    return(
        <ModalLayout { ...modalData } >
          <div className='py-2.5 w-full h-full flex flex-col justify-center items-center gap-5'>
    
            <div className='w-full flex flex-row items-center gap-3 border-2 border-dashed p-3'>
              <Icon as={RiFileShredLine} fontSize='xx-large' color='var(--red-color)'></Icon>
              <div className='flex flex-col gap-2'>
                <Text>Удаление файла не обратимо удалит все данные полученные из него со всех старниц (фильтры, сортировки, параметры заголовков)</Text>
                <Text>Файл: ${name}</Text>
              </div>
            </div>
    
            <Button
            colorScheme='red'
            variant='outline'
            size='sm'
            onClick={() => removeFromCurrentData([id])}
            >
              Удалить файл
            </Button>
          </div>
        </ModalLayout>
    )
}

export default DeleteFileModal