import { FC } from "react"
import { Tooltip, IconButton, Icon } from "@chakra-ui/react"

const NavBtn : FC<NavBtnProps> = ({ tLabel, aLabel, fs, icon, callback, iColor, size, colorScheme, border, isDisabled=false }) => {
    return (
        <Tooltip label={tLabel} bg='#0b2638' placement='right' closeDelay={50}>
            <IconButton
            isRound={true}
            variant='ghost'
            colorScheme={colorScheme ? colorScheme : 'whiteAlpha'}
            aria-label={aLabel}
            size={size ? size : 'sm'}
            fontSize={fs}
            icon={<Icon as={icon} color={iColor} />}
            onFocus={e => e.preventDefault()}
            onClick={callback}
            border={ border ? border : ''}
            isDisabled={isDisabled}
            />
        </Tooltip>
    )
}

export default NavBtn