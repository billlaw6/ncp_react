import axios from "./api";
import { UserI } from "_constants/interface";

export const registerUser = async (params: any) => {
  const res = await axios.post(`/user/register/`, params);
  return res;
};

export const loginUser = async (params: any) => {
  const res = await axios.post(`/auth/login/`, params);
  return res;
};

export const getUserInfo = async () => {
  const res = await axios.get(`/user/user-info/`);
  return res;
};

// export const updateUserInfo = async (params: UserFormI): Promise<UserI> => {
export const updateUserInfo = async (params: any) => {
  // const id = params.get('id');
  // const res = await axios.post(`/user/users/${id}/`, params);
  const res = await axios.post(`/user/update/`, params);
  return res;
};

export const logoutUser = async () => {
  const res = await axios.post(`/auth/logout/`);
  return res;
};

// export const getDepartmentList = async (params: any): Promise(DepartmentI[]) => {
export const getDepartmentList = async (params: any) => {
  const res = await axios.get(`/user/departments/`, params);
  return res;
};

export const getRoleList = async () => {
  const res = await axios.get(`/user/roles/`);
  return res;
};

export const getDutyList = async () => {
  const res = await axios.get(`/user/duties/`);
  return res;
};

export const getWorkStatusList = async () => {
  const res = await axios.get(`/user/work-status/`);
  return res;
};
