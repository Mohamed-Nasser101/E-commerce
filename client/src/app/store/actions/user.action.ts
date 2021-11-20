import {IUser} from "../../shared/models/user";
import {createAction, props} from "@ngrx/store";

export const login = createAction('[AccountLogin component] LOGIN', props<{ user: IUser }>());
export const register = createAction('[AccountRegister component] Register', props<{ user: IUser }>());
export const logout = createAction('[AccountLogout component] Logout');
