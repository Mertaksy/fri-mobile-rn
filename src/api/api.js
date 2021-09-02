import axios from 'axios';

const TEST_API_URL = 'https://devapi.bizimtarifler.com/api/v1';
const LIVE_API_URL = 'https://api.bizimtarifler.com/api/v1';

const api = axios.create({
    baseURL: LIVE_API_URL,
});

api.interceptors.request.use((config) => {
    console.log('--------------------------------');
    console.log(`TYPE: ${config.method}`);
    console.log(`URL : ${config.baseURL + config.url}`);
    console.log(`PATH: ${config.url}`);
    console.log(`AUTH: ${config.headers.common['Authorization']}`);
    console.log('--------------------------------');
    return config;
});

export const switchApi = () => {
    const url = api.defaults.baseURL;
    if (url === LIVE_API_URL) {
        api.defaults.baseURL = TEST_API_URL;
        return;
    }
    api.defaults.baseURL = LIVE_API_URL;
};

export default api;
