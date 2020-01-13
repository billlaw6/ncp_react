import { ICurrentUser, IUserInfo, ILoginForm } from "../../constants/interface";
import {
  setCurrentUserAction,
  setLoginFormAction,
  setUserInfoAction,
  setUserListAction,
} from "../actions/user";
import * as types from "../action-types";

const defaultLoginForm: ILoginForm = {
  username: "",
  password: "",
  remember: false,
  messages: [],
};
const loginFormReducer = (
  state = defaultLoginForm,
  action: ReturnType<typeof setLoginFormAction>,
) => {
  switch (action.type) {
    case types.SET_LOGIN_FORM: {
      return {
        ...defaultLoginForm,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const defaultCurrentUser: ICurrentUser = {
  id: -1,
  token: "",
  username: "",
  cell_phone: "",
  first_name: "",
  last_name: "",
  gender: 0,
  birthday: undefined,
  sign: "",
  address: "",
  unit: "",
  avatar: "",
};
const currentUserReducer = (
  state = defaultCurrentUser,
  action: ReturnType<typeof setCurrentUserAction>,
) => {
  switch (action.type) {
    case types.SET_CURRENT_USER: {
      return {
        ...defaultCurrentUser,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const defaultUserInfo: IUserInfo = {
  id: -1,
  username: "",
  email: "",
  cell_phone: "",
  openid: "",
  unionid: "",
  // 数组定义方法一
  groups: [],
  first_name: "",
  last_name: "",
  pinyin: "",
  py: "",
  gender: 0,
  // 数组定义方法二
  user_permissions: [],
};
const userInfoReducer = (state = defaultUserInfo, action: ReturnType<typeof setUserInfoAction>) => {
  switch (action.type) {
    case types.SET_USER_INFO: {
      return {
        ...defaultUserInfo,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

const defaultUserList: IUserInfo[] = [];
const userListReducer = (state = defaultUserList, action: ReturnType<typeof setUserListAction>) => {
  switch (action.type) {
    case types.SET_USER_LIST: {
      return {
        ...defaultUserList,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export { loginFormReducer, userInfoReducer, currentUserReducer, userListReducer };
