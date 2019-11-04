import { IDraftState, IStoreState } from "../constants/store.d";
import { editDraftAction, EDIT_DRAFT_ACTION_TYPE } from "../actions/";

const defaultState: IDraftState = {
  isChecked: false,
  content: ""
};

const draftReducer = (
  state = defaultState,
  action: ReturnType<typeof editDraftAction>,
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
