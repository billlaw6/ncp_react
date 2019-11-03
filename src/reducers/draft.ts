import { IDraftState, IStoreState } from "../constants/store.d";
// import { Action } from 'redux';
import { editDraftAction, EDIT_DRAFT_ACTION_TYPE } from "../actions/";

const defaultState: IDraftState = {
  isChecked: false,
  content: ""
};

interface Action<T = any, M = any> {
  type: T;
  payload: M;
}

const draftReducer = (
  state = defaultState,
  // action: ReturnType<typeof editDraftAction>,
  action: Action
) => {
  switch (action.type) {
    case EDIT_DRAFT_ACTION_TYPE: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default draftReducer;
