import api from './api';

const getDonations = (uid) => {
    return new Promise((resolve, reject) => {
        api.get('/users/:uid/donations')
        .then( res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const getInvoiceById = (id) => {
    return new Promise((resolve, reject) => {
        api.get('/invoice/:id')
        .then( res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export {
    getDonations,
    getInvoiceById
}