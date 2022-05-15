import { createAction } from '@reduxjs/toolkit';

//Auth actions
export const loginSuccessful = createAction('auth/loginSuccessful');
export const loginFailure = createAction('auth/loginFailure');
export const loginRequest = createAction('auth/loginRequest');

export const registrationSuccessful = createAction(
    'auth/registrationSuccessful'
);
export const registrationFailure = createAction('auth/registrationFailure');
export const registrationRequest = createAction('auth/registrationRequest');

export const orderSuccessful = createAction('order/successful');
export const orderFailure = createAction('order/failure');
export const orderRequest = createAction('order/request');

export const logout = createAction('auth/logout');

//Cart actions
export const getCart = createAction('cart/get');
export const addCartItem = createAction('cart/addItem');
export const removeCartItem = createAction('cart/removeItem');
export const resetCart = createAction('cart/reset');

