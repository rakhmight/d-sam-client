import { FC } from 'react'
import ToolsLayout from '@/components/layouts/tools-layout/ToolsLayout'
import {
    TabPanel,
    Text,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import Filter from './Filter/Filter'

const Filters : FC = () => {
    const { currentData, currentPage } = useSelector((state:RootState)=>state)

    return(
        <TabPanel className='w-full h-full bg-slate-200 rounded'>
            <ToolsLayout>
                <table width='100%' className='text-left'>
                    <thead>
                        <tr className='border-b-[1px] border-[#aaa]'>
                            <th className='pb-2.5'><Text fontSize='sm' color='#555'>Наименование заголовка</Text></th>
                            <th className='pb-2.5'><Text fontSize='sm' color='#555'>Фильтр</Text></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            currentData.files.map(file => file.datasets.map(dataset => (
                                <Filter dataset={dataset} key={`${dataset.fileID}-${dataset.fileKey}`} page={currentPage.page} />
                            )))
                        }
                    </tbody>
                </table>
            </ToolsLayout>
        </TabPanel>
    )
}

export default Filters