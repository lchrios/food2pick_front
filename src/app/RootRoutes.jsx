import React from 'react'
import { Redirect } from 'react-router-dom'

import utilitiesRoutes from './views/utilities/UtilitiesRoutes'
import materialRoutes from './views/material-kit/MaterialRoutes'
import invoiceRoutes from './views/invoice/InvoiceRoutes'
import homeRoutes from './views/home/HomeRoutes'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/home" />,
    },
]

const errorRoute = [
    {
        component: () => <Redirect to="/session/404" />,
    },
]

const routes = [
    ...invoiceRoutes,
    ...homeRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...redirectRoute,
    ...errorRoute,
]

export default routes
