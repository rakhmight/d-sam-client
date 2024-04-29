import { FC } from 'react'
import { Text, Image } from '@chakra-ui/react'

const AppInfo : FC = () => {
    return (
        <div className='px-1.5 flex flex-row gap-1'>
            <div className='flex items-center'>
                <Image src='./media/d-sam-light.png' alt='T-SAM' h='16px' w='16px' />
            </div>
            <div>
                <Text className='pt-1' fontSize='14px' color='#bdbdbd'>Quick data sampling</Text>
            </div>
        </div>
    )
}

export default AppInfo