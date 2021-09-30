import Mock from '../mock'
import shortId from 'shortid'

const NotificationDB = {
    list: [
        {
            id: shortId.generate(),
            heading: 'Alert',
            icon: {
                name: 'notifications',
                color: 'error',
            },
            timestamp: new Date(new Date().getTime() - 10000),
            title: 'Delivery guy nearby',
            subtitle: 'Jorge Nitales is soon to arrive!',
            path: 'invoice/fdskjkljicuviosduisjd',
        },
        {
            id: shortId.generate(),
            heading: 'Message',
            icon: {
                name: 'chat',
                color: 'primary',
            },
            timestamp: new Date(new Date().getTime() - 66000),
            title: 'New message from Devid',
            subtitle: 'Hello, Food has arrived...',
            path: 'invoice/fdskjkljicuviosduisjd',
        },
        {
            id: shortId.generate(),
            heading: 'Message',
            icon: {
                name: 'chat',
                color: 'primary',
            },
            timestamp: new Date(new Date().getTime() - 66),
            title: 'New message from Goustove',
            subtitle: 'Hello, any fruits over there?',
            path: 'invoice/fdskjkljicuviosduisjd',
        },
    ],
}

Mock.onGet('/api/notification').reply((config) => {
    const response = NotificationDB.list
    return [200, response]
})

Mock.onPost('/api/notification/add').reply((config) => {
    const response = NotificationDB.list
    return [200, response]
})

Mock.onPost('/api/notification/delete').reply((config) => {
    let { id } = JSON.parse(config.data)
    console.log(config.data)

    const response = NotificationDB.list.filter(
        (notification) => notification.id !== id
    )
    NotificationDB.list = [...response]
    return [200, response]
})

Mock.onPost('/api/notification/delete-all').reply((config) => {
    NotificationDB.list = []
    const response = NotificationDB.list
    return [200, response]
})
