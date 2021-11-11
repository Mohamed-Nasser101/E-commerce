import {createReducer, on} from "@ngrx/store";
import {incrementCount} from "../actions/basketCounter.action";

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(incrementCount, (state) => state + 1),
);

export function basketCountReducer(state, action) {
  return _counterReducer(state, action);
}
