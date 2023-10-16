import { createAction } from "../../utils/reducer/reducer-utils";
import { CATEGORIES_ACTION_TYPES } from "./categories-action-type";

const { SET_CATEGORIES_MAP } = CATEGORIES_ACTION_TYPES;
export const setCategoriesMap = ( categoriesMap ) => createAction(SET_CATEGORIES_MAP, categoriesMap)