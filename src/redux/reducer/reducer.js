import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, ADD_TO_CART, UPDATE_CART } from '../action/actionTypes'

const initialState = {
    userDetails: null,
    cart: [],
    isAuthenticated: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userDetails: action.payload,
                isAuthenticated: true,
            }
        case REGISTER_USER:
            return {
                ...state,
                userDetails: action.payload,
                isAuthenticated: true,
            }
        case LOGOUT_USER:
            return {
                ...state,
                userDetails: null,
                isAuthenticated: false,
            }
        case ADD_TO_CART:
            return {
                ...state,
                userDetails: action.payload,
                cart: action.payload.cart,
                isAuthenticated: true,
            }
        case UPDATE_CART:
            return {
                ...state,
                userDetails: action.payload,
                cart: action.payload.cart,
                isAuthenticated: true,
            }
        default:
            return state;
    }
}