import axios from './api';

export const userLogin = async (params: any) => {
    const res = await axios.post(`/auth/login/`, params);
    return res;
}

export const userLogout = async (params: any) => {
    const res = await axios.post(`/auth/logout/`, { params: params });
    return res;
}

export const sendIdentifyingCode = async (params: any) => {
    const res = await axios.post(`/user/send-sms/`, params);
    return res;
}