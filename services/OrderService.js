import axios from '../libs/axiosinstance';

export async function create(order) {
    return await axios
        .post('/orders/create', order)
        .then(({ data }) => data)
        .catch((error) => {
            const { message } = error.response.data;
            throw new Error(message);
        });
}

export async function findById(id) {
    return await axios
        .get(`/orders/${id}`)
        .then(({ data }) => data)
        .catch((error) => error);
}

export async function findAllForUser() {
    return await axios
        .get('/users/orders')
        .then(({ data }) => data)
        .catch((error) => error);
}

export async function remove(id) {
    return await axios
        .delete(`/orders/${id}`)
        .then(() => Promise.resolve())
        .catch((error) => error);
}

export async function findAll() {
    return await axios
        .get('/admin/orders')
        .then(({ data }) => data)
        .catch((error) => {
            const message = error.response.message;
            return message;
        });
}

