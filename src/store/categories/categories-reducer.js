import { CATEGORIES_ACTION_TYPES } from "./categories-action-type";

export const CATEGORIES_INITIAL_STATE = {
    categoriesMap: {},
    isLoading: false,
    error: null
}
const { FETCH_CATEGORIES_SUCCESS , FETCH_CATEGORIES_START, FETCH_CATEGORIES_FAILED} = CATEGORIES_ACTION_TYPES;
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type){   
        case FETCH_CATEGORIES_START:
            return { ...state, isLoading: true}

        case FETCH_CATEGORIES_SUCCESS: 
        return{ ...state, categoriesMap: payload, isLoading: false
        }

        case FETCH_CATEGORIES_FAILED:
            return { ...state, error: payload, isLoading: false}
            
        default:
            return state;
    }
}