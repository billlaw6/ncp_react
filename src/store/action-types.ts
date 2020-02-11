// 只有全局变量才写在reducer里，需要修改全局变量的用API请求才通过saga发出，其它的直接在页面中
//
export const SET_USER = "set_user";
export const REGISTER_USER = "register_user";
export const LOGIN_USER = "login_user";
export const UPDATE_USER = "update_user";
export const LOGOUT_USER = "logout_user";
export const SET_TOKEN = "set_token";
//
export const GET_DEPARTMENT_LIST = "get_department_list";
export const SET_DEPARTMENT_LIST = "set_department_list";

export const GET_TEMP_REPORT_LIST = "get_temp_report_list";
export const SET_TEMP_REPORT_LIST = "set_temp_report_list";
export const CHECK_TEMP_REPORT_LIST = "check_temp_report_list";
