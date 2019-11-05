import { IDraftState } from '../constants/store.d';
import { editDraftAction, EDIT_DRAFT_ACTION_TYPE } from '../actions/draft';

// 设置本组件默认值
const defaultState: IDraftState = {
    isChecked: false,
    content: 'origin',
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
