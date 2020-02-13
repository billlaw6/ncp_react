import axios from "./api";

export const submitTempReport = async (params: any) => {
  const res = await axios.post(`/report/temp/`, params );
  return res;
};

export const getTempReportList = async (params: any) => {
  const res = await axios.get(`/report/temp/`, { params: params });
  return res;
};

export const checkTempReport = async (params: string[]) => {
  const res = await axios.post(`/report/temp/check/`, { params: params });
  return res;
};

export const downloadTempReportList = async (params: any) => {
  const res = await axios.post(`/report/temp/download/`, params );
  return res;
}

export const getTempReportDetail = async (params: any) => {
  const res = await axios.get(`/report/temp/${params.id}`, { params: params });
  return res;
};

export const searchTempReport = async (params: any) => {
  const res = await axios.get(`/report/temp/`, { params: params });
  return res;
};

export const submitCadreReport = async (params: any) => {
  const res = await axios.post(`/report/cadre/`, params);
  return res;
};

export const getCadreReportList = async (params: any) => {
  const res = await axios.get(`/report/cadre/`, { params: params });
  return res;
};

export const checkCadreReport = async (params: string[]) => {
  const res = await axios.post(`/report/cadre/check/`, { params: params });
  return res;
};

export const downloadCadreReportList = async (params: any) => {
  const res = await axios.post(`/report/cadre/download/`, params);
  return res;
};

export const getCadreReportDetail = async (params: any) => {
  const res = await axios.get(`/report/cadre/${params.id}`, { params: params });
  return res;
};

export const searchCadreReport = async (params: any) => {
  const res = await axios.get(`/report/cadre/`, { params: params });
  return res;
};