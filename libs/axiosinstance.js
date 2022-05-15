import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const instance = axios.create({
    baseURL: publicRuntimeConfig.backendUrl,
    timeout: 1500,
    withCredentials: true,
    responseType: 'json',
});

export default instance;

