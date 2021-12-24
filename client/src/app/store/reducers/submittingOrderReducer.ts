import {createReducer, on} from "@ngrx/store";
import {endSubmitting, startSubmitting} from "../actions/submittingOrder.action";


export const initialState = false;

const _submittingOrderReducer = createReducer(
  initialState,
  on(startSubmitting, (state) => true),
  on(endSubmitting, (state) => false),
);

export function submittingOrderReducer(state, action) {
  return _submittingOrderReducer(state, action);
}
