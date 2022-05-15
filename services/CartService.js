import axios from '../libs/axiosinstance';

export async function addItem(item) {
    return await axios
        .post('/cart/add-item', item, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(({ data }) => data)
        .catch((error) => error);
}

export async function removeItem(id) {
    return await axios
        .post(`/cart/remove-item/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then()
        .catch(({ data }) => data.message);
}

