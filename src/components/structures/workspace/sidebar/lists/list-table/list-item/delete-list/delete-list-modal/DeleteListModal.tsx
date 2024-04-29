import { FC } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import ModalLayout from '@/components/ui/modals/modals-layout/ModalLayout'
import { RiFileShredLine } from "react-icons/ri";
import { Button, Icon, Text } from '@chakra-ui/react';
import { useActions } from '@/hooks/useActions/useActions'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const DeleteListModal : FC<NavigationModalProps&{ id: number }> = ({state, handler, id}) => {
  const modalData = {
    state,
    handler,
    icon: MdDeleteOutline,
    title: 'Вы уверены, что хотите удалить лист?',
    titleColor: 'var(--red-color)'
  }

  const { currentData } = useSelector((state:RootState)=>state)
  const { removeList, setCurrentPage } = useActions()
   
  return (
    <ModalLayout { ...modalData } >
      <div className='py-2.5 w-full h-full flex flex-col justify-center items-center gap-5'>

        <div className='w-full flex flex-row items-center gap-3 border-2 border-dashed p-3'>
          <Icon as={RiFileShredLine} fontSize='xx-large' color='var(--red-color)'></Icon>
          <Text>Удаление листа не обратимо удалит все фильтры, сортировки и установленные в нём настройки заголовков.</Text>
        </div>

        <Button
        colorScheme='red'
        variant='outline'
        size='sm'
        onClick={() => {
          removeList({ id })

          let counter = 1
          let listIsFind = false
          while(counter != 10){
            if(!listIsFind){
              const listData = currentData.lists.find(list => list.id === id-counter)
              if(listData){
                console.log(listData.id);
                
                setCurrentPage({ id: listData.id })
                listIsFind = true
              }
              counter++
            } else counter = 10
          }

          if(!listIsFind){
            const firstListData = currentData.lists[0]
            if(firstListData) setCurrentPage({ id: firstListData.id })
            else setCurrentPage({ id: 1 })
          }

        }}
        >
          Удалить лист
        </Button>
      </div>
    </ModalLayout>
  );
}

export default DeleteListModal;
