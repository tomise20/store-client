import axios from '../libs/axiosinstance';
import * as AuthService from '../services/AuthService';
import * as CartService from '../services/CartService';
import * as OrderService from '../services/OrderService';
import * as types from './types';

export const setLoading = () => types.setLoading();

export const fetchCartSuccessful = (session) => types.getCart(session);

//Cart actions
export const fetchCart = () => (dispatch) => {
    axios
        .get('/cart/get')
        .then(({ data }) => dispatch(fetchCartSuccessful(data)));
};

export const successfullyAddedCartItem = (items, totalPrice) =>
    types.addCartItem({ items, totalPrice });

//Cart actions
export const addCartItem = (id) => (dispatch, getState) => {
    let totalPrice = 0;
    const cart = getState().cart;

    return CartService.addItem({ product_id: id, quantity: 1 })
        .then((cartItem) => {
            const existItem = cart.items.find(
                (item) => item.id === cartItem.id
            );

            const cartItems = existItem
                ? cart.items.map((item) =>
                      item.id === existItem.id ? cartItem : item
                  )
                : [...cart.items, cartItem];

            cartItems.forEach(
                (item) => (totalPrice += item.price * item.quantity)
            );
            dispatch(successfullyAddedCartItem(cartItems, totalPrice));

            return Promise.resolve();
        })
        .catch((err) => Promise.reject(err));
};

export const successfullyRemovedCartItem = (items, totalPrice) =>
    types.addCartItem({ items, totalPrice });

export const removeCartItem = (id) => (dispatch, getState) => {
    let totalPrice = 0;
    const cart = getState().cart;

    return CartService.removeItem(id)
        .then(() => {
            const newItems = cart.items.filter((item) => item.id !== id);
            newItems.forEach(
                (item) => (totalPrice += item.price * item.quantity)
            );
            dispatch(successfullyRemovedCartItem(newItems, totalPrice));

            return Promise.resolve();
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

export const fetchUser = (credentials) => (dispatch) => {
    dispatch(types.loginRequest);
    AuthService.login(credentials)
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(types.loginSuccessful(user));
        })
        .catch((err) => dispatch(types.FailureLogin(err)));
};

export const logoutSuccessful = () => types.logout();

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch(logoutSuccessful());
};

export const registrationSuccessful = (user) =>
    types.registrationSuccessful(user);

export const registrationFailure = (err) => types.registrationFailure(err);

export const registrationRequest = (user) => (dispatch) => {
    dispatch(types.registrationRequest);
    return AuthService.register(user)
        .then((user) => {
            dispatch(registrationSuccessful(user));
            localStorage.setItem('user', JSON.stringify(user));
            return Promise.resolve();
        })
        .catch((err) => {
            dispatch(registrationFailure(err));
            return Promise.reject();
        });
};

export const orderSuccessful = (user) => types.orderSuccessful(user);

export const orderFailure = (err) => types.orderSuccessful(err);

export const orderRequest = (order) => (dispatch) => {
    dispatch(types.orderRequest);
    return OrderService.create(order)
        .then((order) => {
            dispatch(orderSuccessful(order));
            return Promise.resolve(order);
        })
        .catch((err) => {
            dispatch(orderFailure(err));
            return Promise.reject(err);
        });
};

