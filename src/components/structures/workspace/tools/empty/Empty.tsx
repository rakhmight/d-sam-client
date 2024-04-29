import { FC } from 'react'
import { Image, Text } from '@chakra-ui/react'
import FilesDropzone from '../../sidebar/files-dropzone/FilesDropzone'

interface EmptyProps {
    mode: 'not-files' | 'not-lists'
}

const Empty : FC<EmptyProps> = ({ mode }) => {
    return(
        <>
            {
                mode=='not-files' ? (
                    <div className='bg-slate-200 min-h-[78vh] max-h-[78vh] rounded-b drop-shadow-sm'>
                        <FilesDropzone componentStyles='h-[78vh]' />
                    </div>
                ) : (
                    <div className='bg-slate-200 min-h-[78vh] max-h-[78vh] flex flex-col items-center justify-center gap-2'>
                        <Image src='./media/papers.png' alt='Empty' h='50px' w='50px' className='opacity-60' />
                        <Text fontSize='0.9rem' color='#888' align='center'>Страниц нет</Text>
                    </div>
                )
            }
        </>
    )
}

export default Empty