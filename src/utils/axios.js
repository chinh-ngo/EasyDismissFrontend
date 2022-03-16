import axios from 'axios';
import store from '../store/store';
import {logoutUser} from '../store/reducers/auth';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_BASEURL}`
});

instance.interceptors.request.use(
    (request) => {
        const {token} = store.getState().auth;
        if (token) {
            request.headers.Authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.data.status === 401) {
            store.dispatch(logoutUser());
        }
        return Promise.reject(error);
    }
);

export default instance;
