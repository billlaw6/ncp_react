/* eslint-disable @typescript-eslint/camelcase */
import { UserI } from "../../constants/interface";
import { setTokenAction, setUserAction } from "../actions/user";
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
  username: "",
  cell_phone: "",
  gender: 0,
  age: 0,
  sign: "",
  address: "",
  unit: "",
  avatar: "",
  privacy_notice: 0,
};

const userReducer = (state = defaultUser, action: ReturnType<typeof setUserAction>): UserI => {
  switch (action.type) {
    case types.SET_USER: {
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

export { tokenReducer, userReducer };
