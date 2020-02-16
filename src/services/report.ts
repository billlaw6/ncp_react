import axios from "./api";
import { DailyReportSearchFormI } from "_constants/interface";

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

////////////// ////////////// ////////////// //////////////
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

////////////// ////////////// ////////////// //////////////
export const submitDailyReport = async (params: any) => {
  const res = await axios.post(`/report/daily/`, params);
  return res;
};

export const getDailyReportList = async (params: DailyReportSearchFormI) => {
  // console.log(params);
  const res = await axios.get(`/report/daily/`, { params: params});
  return res;
};

export const checkDailyReport = async (params: string[]) => {
  const res = await axios.post(`/report/daily/check/`, { params: params });
  return res;
};

export const downloadDailyReportList = async (params: any) => {
  const res = await axios.post(`/report/daily/download/`, params);
  return res;
};

export const getDailyReportDetail = async (params: any) => {
  const res = await axios.get(`/report/daily/${params.id}`, { params: params });
  return res;
};

export const searchDailyReport = async (params: any) => {
  const res = await axios.get(`/report/daily/`, { params: params });
  return res;
};