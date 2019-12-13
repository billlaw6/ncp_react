import { ICanvasState } from '../../constants/interface';
import { changeCanvasAction, EDIT_CANVAS_ACTION_TYPE } from '../actions/canvas';
import { statement } from '@babel/template';

const defaultState: ICanvasState = {
    label: 'I am original lable',
};

const canvasReducer = (
    state = defaultState,
    action: ReturnType<typeof changeCanvasAction>,
) => {
    switch(action.type) {
        case 'EDIT_CANVAS_ACTION_TYPE':
            return {
                ...state,
                label: 'abc',
            }
        default:
            return state;
    };
};

export default canvasReducer;
