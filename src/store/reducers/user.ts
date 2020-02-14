/* eslint-disable @typescript-eslint/camelcase */
import { UserI, DepartmentI } from "_constants/interface";
import { setTokenAction, setUserAction, updateUserAction, setDepartmentListAction } from "_actions/user";
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

const defaultUser: UserI = {
  id: -1,
  emp_code: "",
  name: "",
  role: -1,
  department: "",
  duty: "01",
  cell_phone: "",
  gender: 0,
  age: 0,
  address: "",
  unit: "",
};

const userReducer = (
  state = defaultUser,
  action: ReturnType<typeof setUserAction> | ReturnType<typeof updateUserAction>,
): UserI => {
  switch (action.type) {
    case types.SET_USER: {
      // console.log("action payload: ", action.payload as FormData);
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

export { tokenReducer, userReducer, departmentListReducer };
