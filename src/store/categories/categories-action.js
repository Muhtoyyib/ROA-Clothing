import { createAction } from "../../utils/reducer/reducer-utils";
import { CATEGORIES_ACTION_TYPES } from "./categories-action-type";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase";

const { FETCH_CATEGORIES_FAILED, FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS } = CATEGORIES_ACTION_TYPES;

export const fetchCategoriesStart = () => createAction(FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesMap ) => createAction(FETCH_CATEGORIES_SUCCESS, categoriesMap );

export const fetchCategoriesFailed = ( error ) => createAction(FETCH_CATEGORIES_FAILED,  error);

export const fetchCategoriesAsync = () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try{
        const categoryMap = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoryMap));
    } catch(error){
        dispatch(fetchCategoriesFailed(error));
    }
}