declare interface NavBtnProps {
    tLabel: string,
    aLabel: string,
    fs: string,
    icon: import('@chakra-ui/react').As,
    callback?: React.MouseEventHandler,
    iColor?: string,
    size?: string,
    colorScheme?: string,
    border?: string,
    isDisabled?: boolean
}