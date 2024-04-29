import { FC } from 'react'
import { TabList, Tab, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const Headers : FC = () => {

    const {currentData} = useSelector((state:RootState)=>state)

    return(
        <TabList mb='1em' bg='var(--main-color)' className='rounded text-[#bbb]'>
            <Tab _selected={{ color: '#fff', border: '1px solid #999' }} isDisabled={!currentData.lists.length}>
                <Text fontSize='0.9rem'>Фильтры</Text>
            </Tab>
            <Tab _selected={{ color: '#fff', border: '1px solid #999' }} isDisabled={!currentData.lists.length}>
                <Text fontSize='0.9rem'>Сотрировка</Text>
            </Tab>
            <Tab _selected={{ color: '#fff', border: '1px solid #999' }} isDisabled={!currentData.lists.length}>
                <Text fontSize='0.9rem'>Настройки заголовков</Text>
            </Tab>
        </TabList>
    )
}

export default Headers