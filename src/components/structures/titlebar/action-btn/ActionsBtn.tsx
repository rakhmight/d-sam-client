import { FC, useState } from 'react'
import { WindowMethodsAPI } from './types'
import { appWindow } from '@tauri-apps/api/window'
import { IconButton, Icon } from '@chakra-ui/react'
import { VscChromeMinimize } from 'react-icons/vsc'
import { TfiClose } from 'react-icons/tfi'
import { FiMinimize2, FiMaximize2 } from 'react-icons/fi'

const ActionBtn : FC = () => {
    const [ isMaximized, changeMaximized ] = useState(false)
    
    const minimizeWindow : WindowMethodsAPI = () => {
        appWindow.minimize()
    }
    const maximizeWindow : WindowMethodsAPI = () => {
        appWindow.maximize()
    }
    const unmaximizeWindow : WindowMethodsAPI = () => {
        appWindow.unmaximize()
    }
    const closeWindow : WindowMethodsAPI = () => {
        appWindow.close()
    }

    function handleClick(act:string) {
        if(act === 'max'){
            maximizeWindow()
            changeMaximized(true)
            
        } else if(act === 'min'){
            unmaximizeWindow()
            changeMaximized(false)
        }
    }

    return(
        <>
            <IconButton
            variant='ghost'
            colorScheme='whiteAlpha'
            aria-label='Collapse'
            size="sm"
            fontSize='18px'
            icon={ <Icon as={VscChromeMinimize} /> }
            onClick={ minimizeWindow }
            />
            
            {
                !isMaximized && (
                    <IconButton
                    variant='ghost'
                    colorScheme='whiteAlpha'
                    aria-label='Maximize'
                    size="sm"
                    fontSize='18px'
                    icon={ <Icon as={FiMaximize2} /> }
                    onClick={ () => handleClick('max') }
                    />
                )
            }
            
            {
                isMaximized && (
                    <IconButton
                    variant='ghost'
                    colorScheme='whiteAlpha'
                    aria-label='Minimize'
                    size="sm"
                    fontSize='18px'
                    icon={ <Icon as={FiMinimize2} /> }
                    onClick={ () => handleClick('min') }
                    />
                )
            }
            
            <IconButton
            variant='ghost'
            colorScheme='whiteAlpha'
            aria-label='Close app'
            size="sm"
            fontSize='14px' 
            icon={ <Icon as={TfiClose} color="v(--red-color)" /> }
            onClick={ closeWindow }
            />
        </>
    )

}

export default ActionBtn