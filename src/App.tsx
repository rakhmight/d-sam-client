import { BrowserRouter } from 'react-router-dom'
import GeneralLayout from '@/components/layouts/general-layout/GeneralLayout'
import Titlebar from './components/structures/titlebar/Titlebar'
import Sidebar from './components/structures/sidebar/Sidebar'
import AppRoutes from './routes'
import "@/assets/css/global.css"
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useActions } from './hooks/useActions/useActions'
import { ToastPosition, useToast } from '@chakra-ui/react'

function App() {
  const { currentData, dateStack } = useSelector((state:RootState)=>state)
  const { replaceFilesData, switchDateStackLoading } = useActions()
  
  const toast = useToast()
  const toastGeneral:{position:ToastPosition, variant:string, size: string, duration: number, containerStyle: Object} = {
      position: 'bottom-right',
      variant: 'left-accent',
      size: 'sm',
      duration: 3000,
      containerStyle: {
          fontSize: '0.9rem',
          width: '320px',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
      }
  }

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', () => {
      invoke('close_splashscreen')
    })
  })

  useEffect(() => {
    if(dateStack.stack.length) {
      if(dateStack.fileCount == dateStack.readFileCount) {
        console.log(1, dateStack)
        
        const dateWorker = new Worker('./workers/dateWorker.js')
        dateWorker.postMessage({ type: 'handle', currentData, stack: dateStack.stack })
        switchDateStackLoading(false)

        dateWorker.onmessage = function(event) {
          if(event.data.type == 'handle-done'){
            replaceFilesData(event.data.filesData)
            console.log(event.data.filesData);
            
            switchDateStackLoading(true)

            toast({
              ...toastGeneral,
              title: `Обработка данных завершена`,
              status: 'info',
              colorScheme: 'facebook'
            })
          }
        }
      }
    }
  }, [dateStack.readFileCount])

  return (
    <BrowserRouter>
      <GeneralLayout>
        <Titlebar />
        <Sidebar />
        <AppRoutes />
      </GeneralLayout>
    </BrowserRouter>
  )
}

export default App
