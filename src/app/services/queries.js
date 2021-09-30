import api from './api';

const getDonationsByDonator = (uid) => {
    return new Promise((resolve, reject) => {
        api.get('/users/:uid/donation')
        .then( res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const getDonationById = (id) => {
    return new Promise((resolve, reject) => {
        api.get('/donation/:id')
        .then( res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const uploadDonation = (donation) => {
    return new Promise((resolve, reject) => {
        api.post('/donation/new', donation)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const getAllDonators = () => {
    return new Promise((resolve, reject) => {
        api.get('/donators')
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const getAllTransports = () => {
    return new Promise((resolve, reject) => {
        api.get('/transports')
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const getAllReceivers = () => {
    return new Promise((resolve, reject) => {
        api.get('/receivers')
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

const getDonationsByReceiver = (receiver) => {
    return new Promise((resolve, reject) => {
        api.get('/receiver/:id')
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    })
}

export {
    getDonationsByDonator,
    getDonationById,
    uploadDonation,
    getDonationsByReceiver,
    getAllDonators,
    getAllReceivers,
    getAllTransports,
}