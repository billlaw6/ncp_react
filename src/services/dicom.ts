import axios from './api';

export const searchDicomInfo = async (params: any) => {
    const res = await axios.post(`/dicom/search/`, params);
    return res;
}

export const searchDicomFile = async (params: any) => {
    const res = await axios.post(`/dicom/dicom-file/`, { params: params });
    return res;
}