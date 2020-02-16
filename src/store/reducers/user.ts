/* eslint-disable @typescript-eslint/camelcase */
import { UserI, DepartmentI } from "_constants/interface";
import { setTokenAction, setLoginErrorAction, setUserAction, updateUserAction, setDepartmentListAction } from "_actions/user";
import * as types from "../action-types";

const defaultToken = "";
const tokenReducer = (state = defaultToken, action: ReturnType<typeof setTokenAction>): string => {
  switch (action.type) {
    case types.SET_TOKEN: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const defaultLoginError = "";
const loginErrorReducer = (state = defaultLoginError, action: ReturnType<typeof setLoginErrorAction>): string => {
  switch (action.type) {
    case types.SET_LOGIN_ERROR: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const defaultUser: UserI = {
  id: -1,
  emp_code: "",
  name: "",
  role: "",
  department: "",
  duty: "",
  work_department: "",
  work_status: "",
  cell_phone: "",
  gender: 0,
  age: 0,
  address: "",
  unit: "",
  groups: [],
};
const userReducer = (
  state = defaultUser,
  action: ReturnType<typeof setUserAction>,
): UserI => {
  switch (action.type) {
    case types.SET_USER: {
      // console.log("action payload: ", action.payload as FormData);
      console.log(action.payload);
      return {
        ...defaultUser,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const defaultDepartmentList: DepartmentI[] = [];
const departmentListReducer = (
  state = defaultDepartmentList,
  action: ReturnType<typeof setDepartmentListAction>,
): DepartmentI[] => {
  switch (action.type) {
    case types.SET_DEPARTMENT_LIST: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export { tokenReducer, loginErrorReducer, userReducer, departmentListReducer };
