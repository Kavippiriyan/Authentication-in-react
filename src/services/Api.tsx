import axios from 'axios';
import { getuserdata } from './storage';

interface RegisterInputs {
    name: string;
    email: string;
    password: string;
}

interface LoginInputs {
    email: string;
    password: string;
}

axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";
const API_KEY = "AIzaSyBF9htu4fznYUY28ZjAPllhUOO8zzeUw3k";
const REGISTER_URL = `/accounts:signUp?key=${API_KEY}`;
const LOGIN_URL = `/accounts:signInWithPassword?key=${API_KEY}`;
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;

export const RegisterApi = (inputs: RegisterInputs) => {
    const data = {
        displayName: inputs.name,
        email: inputs.email,
        password: inputs.password
    };
    return axios.post(REGISTER_URL, data);
};

export const LoginApi = (inputs: LoginInputs) => {
    const data = {
        email: inputs.email,
        password: inputs.password
    };
    return axios.post(LOGIN_URL, data);
};

export const userDetailsapi = () => {
    const data = {
        idToken: getuserdata()
    };
    return axios.post(USER_DETAILS_URL, data);
};
