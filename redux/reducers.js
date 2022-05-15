/* eslint-disable no-case-declarations */
import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import * as types from './types';

const initAuthState = {
    loading: false,
    user: {},
    error: [],
};

const initCartState = {
    total_price: 0,
    items: [],
    error: [],
};

const authReducer = createReducer(initAuthState, (builder) => {
    builder
        .addCase(types.loginRequest, (state) => {
            return { ...state, loading: true };
        })
        .addCase(types.loginSuccessful, (state, { payload }) => {
            return { ...state, user: payload, loading: false };
        })
        .addCase(types.loginFailure, (state, { payload }) => {
            return { ...state, err: payload, loading: false };
        })
        .addCase(types.registrationSuccessful, (state, { payload }) => {
            return { ...state, user: payload };
        })
        .addCase(types.logout, () => {
            return { ...initAuthState };
        });
});

const cartReducer = createReducer(initCartState, (builder) => {
    builder
        .addCase(types.getCart, (state, { payload }) => {
            return {
                ...state,
                total_price: payload.total_price,
                items: [...payload.items],
            };
        })
        .addCase(types.addCartItem, (state, { payload }) => {
            return {
                ...state,
                items: payload.items,
                total_price: payload.totalPrice,
            };
        })
        .addCase(types.removeCartItem, (state, { payload }) => {
            return {
                ...state,
                items: payload.items ?? [],
                total_price: payload.totalPrice,
            };
        });
});

const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

export default reducers;

