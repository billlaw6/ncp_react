import { ICanvasState } from '../constants/store.d';
import { changeCanvasAction, EDIT_CANVAS_ACTION_TYPE } from '../actions/canvas';

const defaultState: ICanvasState = {
    label: 'I am original lable',
};

const canvasReducer = (
    state = defaultState,
    action: ReturnType<typeof changeCanvasAction>,
) => {
    switch (action.type) {
        case 'EDIT_CANVAS_ACTION_TYPE':
            return action.payload;
        default:
            return 'I am default reducer label';
    }
};

export default canvasReducer;
