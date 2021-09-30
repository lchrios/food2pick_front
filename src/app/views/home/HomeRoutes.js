import React from 'react'

const homeRoutes = [
    {
        path: '/home',
        component: React.lazy(() => import('./Home')),
    }
]

export default homeRoutes
