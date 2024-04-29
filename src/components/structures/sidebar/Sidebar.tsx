import { FC } from 'react'
import styles from './Sidebar.module.css'
import Settings from './settings/Settings';
import Sessions from './sessions/Sessions';
import Guide from './guide/Guide';


const Sidebar : FC = () => {
  
    return (
        <div className={styles.sidebar}>
          <Sessions />
          <Settings />
          <Guide />
        </div>
    );
  }

export default Sidebar