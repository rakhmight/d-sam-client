import { FC } from 'react'
import { Text, Icon } from '@chakra-ui/react'
import { GoPaperclip } from "react-icons/go"
import Files from './files/Files'
import Download from './download/Download'

const Actions : FC = () => {
    return(
        <div className='flex flex-col'>
            <div className='py-1.5 px-3  bg-[var(--main-color)] rounded flex flex-row items-center gap-1.5'>
                <Icon as={GoPaperclip} color='#fff'></Icon>
                <Text color='#fff' fontSize='0.9rem' className='uppercase'>Действия</Text>
            </div>

            <div className='bg-slate-200 rounded-b overflow-x-auto overflow-y-hidden p-3 flex flex-row gap-3 drop-shadow-sm'>
                <Files />
                <Download />
            </div>
        </div>
    )
}

export default Actions