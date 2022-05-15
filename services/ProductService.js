import axios from '../libs/axiosinstance';

export async function list(page) {
    return await axios
        .get('/products', {
            params: {
                page: page,
            },
        })
        .then(({ data }) => data)
        .catch((error) => error);
}

export async function search(keyword) {
    return await axios
        .get('/products/search', {
            params: {
                q: keyword,
            },
        })
        .then(({ data }) => data)
        .catch((error) => error);
}

