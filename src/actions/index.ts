import { IDraftState } from '../constants/store.d';

export const EDIT_DRAFT_ACTION_TYPE = 'draft/edit';

export const editDraftAction = (payload: IDraftState) => ({
    type: EDIT_DRAFT_ACTION_TYPE,
    payload,
});
