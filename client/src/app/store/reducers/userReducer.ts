import {createReducer, on} from "@ngrx/store";
import {login, logout, register} from "../actions/user.action";

export const initialState = null;

const _userReducer = createReducer(
  initialState,
  on(login, (state, {user}) => user),
  on(register, (state, {user}) => user),
  on(logout, (state) => null)
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
