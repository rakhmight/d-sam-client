import { FC } from 'react'
import {
    IconButton,
    Icon,
    Text,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    As,
  } from '@chakra-ui/react';

import { MdClose } from 'react-icons/md';

interface ModalLayoutProps {
    state: boolean,
    handler: ()=>void,
    icon: As,
    title: string,
    width?: string,
    titleColor?: string,
    children: JSX.Element | Array<JSX.Element>
}

const ModalLayout : FC<ModalLayoutProps> = ({state, handler, icon, title, width, titleColor, children}) => {
    return (
      <Modal isOpen={state} onClose={handler} size='xl' isCentered>
        <ModalOverlay />
        <ModalContent className='flex flex-col gap-2.5 w-full' maxH="80vh" minW={ width ? width : '500px' }>
          <div>
            <div className='flex gap-2.5 justify-between py-2 px-4'>
              <div className='flex gap-1 items-center'>
                <div>
                  <Icon
                    as={icon}
                    color={ titleColor ? titleColor : 'var(--main-color)' }
                    fontSize='18px'
                  />
                </div>
                <div>
                  <Text fontSize='md' as='b' color={ titleColor ? titleColor : 'var(--main-color)' }>
                    { title }
                  </Text>
                </div>
              </div>
              <div>
                <IconButton
                  isRound={true}
                  variant='ghost'
                  colorScheme='red'
                  aria-label='Close modal'
                  size='sm'
                  fontSize='18px'
                  icon={<Icon as={MdClose} />}
                  onClick={handler}
                />
              </div>
            </div>
  
            <Divider borderTop='4px solid' color='#e2e8f0' />
          </div>
  
          <div className='px-3 pb-2.5 text-sm flex flex-col gap-3'>
            { children }
          </div>
        </ModalContent>
      </Modal>
    );
}

export default ModalLayout