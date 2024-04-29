import { FC } from 'react'
import WorkspaceLayout from '@/components/layouts/workspace-layout/WorkspaceLayout'
import Tools from '@/components/structures/workspace/tools/Tools'
import Sidebar from '@/components/structures/workspace/sidebar/Sidebar'

const WorkspaceView : FC = () => {
    return(
        <WorkspaceLayout>
            <Sidebar />
            <Tools />
        </WorkspaceLayout>
    )
}

export default WorkspaceView