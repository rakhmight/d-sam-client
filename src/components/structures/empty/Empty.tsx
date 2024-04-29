import { FC } from 'react'
import { Text, Image } from '@chakra-ui/react'

interface EmptyProps {
    
}

const Empty : FC<EmptyProps> = () => {
    return(
        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
            <Image src='./media/leaf.png' alt='Empty' h='50px' w='50px' className='opacity-60' />
            <Text fontSize='0.9rem'>Пусто</Text>
        </div>
    )
}

export default Empty