import axios from '../libs/axiosinstance';

export async function onPaginate(page, url) {
    return await axios
        .get(url, {
            params: {
                page: page,
            },
        })
        .then(({ data }) => data)
        .catch((error) => {
            const message = error.response.data;
            throw new Error(message);
        });
}

