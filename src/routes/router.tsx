import Home from '@/apps/home'
import { createHashRouter } from 'react-router-dom'

const router = createHashRouter([
    {
        path: '/',
        element: <Home />,
    },
])

export default router
