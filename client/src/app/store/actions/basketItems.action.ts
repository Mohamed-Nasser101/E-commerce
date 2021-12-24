import {createAction, props} from "@ngrx/store";
import {IBasket} from "../../shared/models/basket";

export const setBasket = createAction('[basketItem component] INITIALIZE', props<{ basket: IBasket }>());
export const updateDeliveryMethodId = createAction('[basketDelivery component] INITIALIZE', props<{ deliveryMethodId: number }>());
export const createBasketIntent = createAction('[basketIntent component] CREATE');
export const removeBasket = createAction('[basket component] REMOVE');
