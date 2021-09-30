import React from 'react'
import { Redirect } from 'react-router-dom'

/*import dashboardRoutes from './views/dashboard/DashboardRoutes'
import utilitiesRoutes from './views/utilities/UtilitiesRoutes'

import materialRoutes from './views/material-kit/MaterialRoutes'
import chartsRoute from './views/charts/ChartsRoute'
import dragAndDropRoute from './views/Drag&Drop/DragAndDropRoute'*/
import invoiceRoutes from './views/invoice/InvoiceRoutes'
import homeRoutes from './views/home/HomeRoutes'
import mapRoutes from './views/map/MapRoutes'
/*import calendarRoutes from './views/calendar/CalendarRoutes'
import crudRoute from './views/CRUD/CrudRoutes'
import inboxRoute from './views/inbox/InboxRoutes'
import formsRoutes from './views/forms/FormsRoutes'
import chatRoutes from './views/chat-box/ChatRoutes'
import todoRoutes from './views/todo/TodoRoutes'
import pageLayoutRoutes from './views/page-layouts/PageLayoutRoutees'
import ListRoute from './views/list/ListRoute'

import pricingRoutes from './views/pricing/PricingRoutes'
import scrumBoardRoutes from './views/scrum-board/ScrumBoardRoutes'
import ecommerceRoutes from './views/ecommerce/EcommerceRoutes'
import pagesRoutes from './views/pages/pagesRoutes'
import dataTableRoutes from './views/data-table/dataTableRoutes'*/

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/dashboard/default" />,
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
    ...mapRoutes,
    /*...dashboardRoutes,
    ...materialRoutes,
    ...utilitiesRoutes,
    ...chartsRoute,
    ...dragAndDropRoute,
    ...calendarRoutes,
    ...crudRoute,
    ...inboxRoute,
    ...formsRoutes,
    ...chatRoutes,
    ...todoRoutes,
    ...scrumBoardRoutes,
    ...ecommerceRoutes,
    ...pageLayoutRoutes,
    ...pricingRoutes,
    ...ListRoute,
    ...pagesRoutes,
    ...dataTableRoutes,*/
    ...redirectRoute,
    ...errorRoute,
]

export default routes
