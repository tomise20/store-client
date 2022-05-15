import axios from '../libs/axiosinstance';

export async function login(credentials) {
    return await axios
        .post('login', credentials)
        .then(({ data }) => data)
        .catch((err) => err);
}

export async function register(user) {
    return await axios
        .post('register', user)
        .then(({ data }) => data)
        .catch((error) => error);
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

