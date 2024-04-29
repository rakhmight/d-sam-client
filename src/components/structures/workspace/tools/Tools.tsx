import { FC } from 'react'
import { Tabs, TabPanels } from '@chakra-ui/react'
import Headers from './headers/Headers'
import Keys from './keys/Keys'
import Sorts from './sorts/Sorts'
import Filters from './filters/Filters'
import Empty from './empty/Empty'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Tools : FC = () => {
  const { currentData } = useSelector((state:RootState)=>state)

    return(
      <Tabs size='md' variant='enclosed' className='w-full h-full'>
        <Headers />
          {
            !currentData.files.length ? (
              <Empty mode='not-files' />
            ) : currentData.files.length && !currentData.lists.length ? (
              <Empty mode='not-lists' /> 
            ) : (
              <TabPanels>
                <Filters />
                <Sorts />
                <Keys />
              </TabPanels>
            )
          }
      </Tabs>
    )
}

export default Tools