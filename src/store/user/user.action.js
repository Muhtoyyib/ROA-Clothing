import { USER_ACTION_TYPES } from "./user-action-types";
import { createAction } from "../../utils/reducer/reducer-utils";

const SET_CURRENT_USER = USER_ACTION_TYPES.SET_CURRENT_USER;
export const setCurrentUser = (user) => 
    createAction(SET_CURRENT_USER , user);