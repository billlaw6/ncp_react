import axios from './api';

export const searchDicomInfo = async (params: any) => {
    const res = await axios.get(`/dicom/search/`, params);
    return res;
}

export const searchDicomFile = async (params: any) => {
    const res = await axios.get(`/dicom/dicom-file/`, { params: params });
    return res;
}