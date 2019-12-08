import { ICanvasState } from '../../constants/store';

export const EDIT_CANVAS_ACTION_TYPE = 'canvas/edit';
export const changeCanvasAction = (payload: ICanvasState) => {
    console.log(payload);
    return {
        type: EDIT_CANVAS_ACTION_TYPE,
        payload: payload,
    };
}
