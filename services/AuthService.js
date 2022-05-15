import axios from '../libs/axiosinstance';
import { getErrors } from '../libs/helper';

export async function login(credentials) {
    return await axios
        .post('login', credentials)
        .then(({ data }) => data)
        .catch((error) => {
            const message = error.response.data;
            throw new Error(message);
        });
}

export async function register(user) {
    return await axios
        .post('register', user)
        .then(({ data }) => data)
        .catch(({ response }) => {
            const messages = getErrors(response.data.errors);

            throw new Error(messages);
        });
}

export async function logout() {
    return await axios
        .post('/logout')
        .then(() => {
            localStorage.removeItem('user');

            return Promise.resolve();
        })
        .catch((error) => error);
}

export async function adminLogin(credentials) {
    return await axios
        .post('admin/login', credentials)
        .then(({ data }) => data)
        .catch((error) => {
            const message = error.response.data;
            throw new Error(message);
        });
}

export async function adminLogout() {
    return await axios
        .post('/admin/logout')
        .then(() => {
            localStorage.removeItem('user');

            return Promise.resolve();
        })
        .catch((error) => error);
}

