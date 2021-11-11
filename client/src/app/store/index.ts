import {ActionReducerMap} from '@ngrx/store';
import {basketCountReducer} from "./reducers/basketCount.reducer";

export interface State {
  basketCount
}

export const reducers: ActionReducerMap<State> = {
  basketCount: basketCountReducer
};
