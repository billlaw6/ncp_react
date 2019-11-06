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
    if (!action) return state;

    // const { type, payload, error, status } = action;

    // if (status < 0) {
    //     throw new Error('error');
    // }

    // if (status === 0) {
    //     return state;
    // }

    switch (action.type) {
        case EDIT_DRAFT_ACTION_TYPE: {
            // const { isChecked, content } = payload;
            return action.payload;
            // return Object.assign({}, state, {
            //     isChecked: true,
            //     content: 'EDIT content',
            // });
        }
        default: {
            return state;
        }
    }
};

export default draftReducer;
