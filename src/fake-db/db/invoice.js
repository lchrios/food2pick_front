import Mock from '../mock'

const invoiceDB = {
    invoices: [
        {
            id: 'lkfjdfjdsjdslgkfjdskjfds',
            orderNo: '232',
            status: 'pending',
            date: new Date(),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Schoen, Conn and Mills',
                address:
                    'rodriguez.trent@senger.com \n 61 Johnson St. Shirley, NY 11967. \n \n +202-555-0170',
            },
            seller: {
                name: 'UI Lib',
                address:
                    'sales@ui-lib.com \n 8254 S. Garfield Street. Villa Rica, GA 30180. \n \n +1-202-555-0170',
            },
            item: [
                {
                    name: 'Potatoes',
                    unit: 36,
                    weight: 5.6,
                    state: "Okay",
                },
                {
                    name: 'Carrots',
                    unit: 56,
                    weight: 5.9,
                    state: "Okay",
                },
            ],
        },
        {
            id: 'fkjjirewoigkjdhvkcxyhuig',
            orderNo: '233',
            status: 'processing',
            date: new Date(),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'New Age Inc.',
                address:
                    'this is a test address \n 7664 Rockcrest Road. Longview, TX 75604. \n \n +1-202-555-0153',
            },
            seller: {
                name: 'UI Lib',
                address:
                    'sales@ui-lib.com \n 8254 S. Garfield Street. Villa Rica, GA 30180. \n \n +1-202-555-0170',
            },
            item: [
                {
                    name: 'Onions',
                    unit: 36,
                    weight: 5.4,
                    state: "Okay",
                },
                {
                    name: 'Beef',
                    unit: 100,
                    weight: 10.6,
                    state: "Okay",
                },
            ],
        },
        {
            id: 'fdskjkljicuviosduisjd',
            orderNo: '234',
            status: 'delivered',
            date: new Date(),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Predovic, Schowalter and Haag',
                address:
                    'linwood53@price.com \n 7178 Plumb Branch Dr. South Bend, IN 46614 \n \n +999 9999 9999',
            },
            seller: {
                name: 'UI Lib',
                address:
                    'sales@ui-lib.com \n 8254 S. Garfield Street. Villa Rica, GA 30180. \n \n +1-202-555-0170',
            },
            item: [
                {
                    name: 'Banana',
                    unit: 36,
                    weight: 3.2,
                    state: "Okay",
                },
                {
                    name: 'Apple',
                    unit: 36,
                    weight: 4.1,
                    state: "Okay",
                },{
                    name: 'Watermelon',
                    unit: 4,
                    weight: 16.3,
                    state: "Okay",
                },
            ],
        },
        {
            id: 'fdskfjdsuoiucrwevbgd',
            orderNo: '235',
            status: 'delivered',
            date: new Date(),
            currency: '$',
            vat: 10,
            buyer: {
                name: 'Hane PLC',
                address:
                    'nader.savanna@lindgren.org \n 858 8th St. Nanuet, NY 10954. \n \n +202-555-0131',
            },
            seller: {
                name: 'UI Lib',
                address:
                    'sales@ui-lib.com \n 8254 S. Garfield Street. Villa Rica, GA 30180. \n \n +1-202-555-0170',
            },
            item: [
                {
                    name: 'Sandwich',
                    unit: 24,
                    weight: 6.1,
                    state: "Okay",
                },
                {
                    name: 'Orange Juice (355 container)',
                    unit: 24,
                    weight: 8.9,
                    state: "Okay",
                },{
                    name: 'Kiwi',
                    unit: 24,
                    weight: 2.4,
                    state: "Okay",
                },
                {
                    name: 'Jalapeno',
                    unit: 36,
                    weight: 1.0,
                    state: "Okay",
                },
            ],
        },
    ],
}

Mock.onGet('/api/invoices/all').reply((config) => {
    return [200, invoiceDB.invoices]
})

Mock.onGet('/api/invoices').reply((config) => {
    const id = config.data
    const response = invoiceDB.invoices.find((invoice) => invoice.id === id)
    return [200, response]
})

Mock.onPost('/api/invoices/delete').reply((config) => {
    let invoice = JSON.parse(config.data)
    let index = { i: 0 }
    invoiceDB.invoices.forEach((element) => {
        if (element.id === invoice.id) {
            return [200, invoiceDB.invoices.splice(index.i, 1)]
        }
        index.i++
    })
    return [200, invoiceDB.invoices]
})

Mock.onPost('/api/invoices/update').reply((config) => {
    let invoice = JSON.parse(config.data)
    let index = { i: 0 }
    invoiceDB.invoices.forEach((element) => {
        if (element.id === invoice.id) {
            invoiceDB.invoices[index.i] = invoice
            return [200, invoiceDB.invoices]
        }
        index.i++
    })
    return [200, invoiceDB.invoices]
})

Mock.onPost('/api/invoices/add').reply((config) => {
    let invoice = JSON.parse(config.data)
    invoiceDB.invoices.push(invoice)
    return [200, invoiceDB.invoices]
})
