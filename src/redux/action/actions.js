import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, ADD_TO_CART, UPDATE_CART } from './actionTypes'

export const registerUser = (userDetails) => {
    return {
        type: REGISTER_USER,
        payload: userDetails
    }
}

export const loginUser = (userDetails) => {
    return {
        type: LOGIN_USER,
        payload: userDetails,
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    }
}

export const addToCart = (userDetails) => {
    console.log('addToCart');
    return {
        type: ADD_TO_CART,
        payload: userDetails,
    }
}

export const updateCart = (userDetails) => {
    return {
        type: UPDATE_CART,
        payload: userDetails,
    }
}