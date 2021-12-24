import {IBasketItem} from '../../shared/models/basket';
import {createAction, props} from "@ngrx/store";
import {IProduct} from "../../shared/models/product";
import {IOrderRequirement} from "../../shared/models/order";


export const loadBasket = createAction('[basketItem component] FIRST_LOAD');
export const addToBasket =
  createAction('[basketItem component] ADD_ITEM_TO_BASKET', props<{ item: IProduct, quantity: number }>());

export const incrementItem = createAction('[basketItem component] INCREMENT_ITEM_EFFECT', props<{ item: IBasketItem }>());
export const decrementItem = createAction('[basketItem component] DECREMENT_ITEM_EFFECT', props<{ item: IBasketItem }>());
export const removeItem = createAction('[basketItem component] REMOVE_ITEM_EFFECT', props<{ itemId: number }>());


export const loginUserAction = createAction('[UserLoginEffect] LOGIN_USER_EFFECTS', props<{ credentials: any, returnUrl: string }>());
export const registerUserAction = createAction('[UserRegisterEffect] REGISTER_USER_EFFECTS', props<{ value: any }>());
export const logoutUserAction = createAction('[UserLogoutEffect] LOGOUT_USER_EFFECTS');
export const initiateLoginAction = createAction('[InitiateLoginUserEffect] INITIATE_LOGIN_USER_EFFECTS');


export const makeOrderAction = createAction('[MakeOrderEffect] MAKE_ORDER_EFFECTS AFTER_INTENT', props<{ orderRequirement: IOrderRequirement }>());

export const setDeliveryMethodId = createAction('[basketDelivery component] DELIVERY_EFFECT', props<{ deliveryMethodId: number }>());
