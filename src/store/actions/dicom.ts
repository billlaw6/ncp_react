import { ISearchForm, IExamIndexList } from '../../constants/interface';
import * as types from '../action-types';

// 用于在SAGA中触发请求
export const submitExamIndexSearchAction = (payload: ISearchForm) => ({
    type: types.SUBMIT_EXAM_INDEX_SEARCH_FORM,
    payload,
})

export const setExamIndexListAction = (payload: IExamIndexList[]) => ({
    type: types.SET_EXAM_INDEX_LIST,
    payload,
})