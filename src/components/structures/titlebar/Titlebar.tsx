import { FC } from 'react'
import AppInfo from './app-info/AppInfo'
import ActionsBtn from './action-btn/ActionsBtn'
import styles from './Titlebar.module.css'

const Titlebar : FC = () => {

    return (
        <div data-tauri-drag-region className={styles.titlebar}>
            <AppInfo/>

            <div className='flex flex-row'>
                <ActionsBtn />
            </div>
        </div>
    )
}

export default Titlebar