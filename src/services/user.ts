import axios from './api';

export const userLogin = (params: any) => {
    return axios.post(`/auth/login/`, params).then(res => res)
}

export const userLogout = (params: any) => {
    return axios.post(`/auth/logout/`, {params: params}).then(res => res)
}