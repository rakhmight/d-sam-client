import { Route, Routes } from 'react-router-dom'
import WorkspaceView from '@/views/workspace-view/WorkspaceView'

const AppRoutes = () => (
    <Routes>
      <Route path='/' element={<WorkspaceView />} />
    </Routes>
    
)
  
  export default AppRoutes