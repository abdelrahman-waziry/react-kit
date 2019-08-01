import {
    AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, SET_LOCALE, UPDATE_CONNECTION_STATUS
} from './action-types'
import { en } from '../../../../resources/en';
import { ar } from '../../../../resources/ar';


/**
 * Module internal initial state
 */
const initialState = {
    isAuthenticated: false,
    token: null,
    currentLocale: null,
    currentResource: null,
    connectionStatus: false,
};  


/**
 * Check dispatched action and update state accordingly
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Function} 
 */

const reducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case AUTH_LOGIN:
            return login(state, payload)
        case AUTH_CHECK: 
            return checkAuth(state)
        case AUTH_LOGOUT: 
            return logout(state)
        case SET_LOCALE: 
            return setLocale(state, payload)
        case UPDATE_CONNECTION_STATUS: 
            return updateConnectionStatus(state, payload)
        default:
            return state;
    }
} 

function login(state, payload) {
    localStorage.setItem('access_token', payload);
    return {
      ...state, isAuthenticated: true, token: payload
    }
}

function checkAuth(state) {
    state = Object.assign({}, state, {
      isAuthenticated: !!localStorage.getItem('access_token'),
      token: localStorage.getItem('access_token')
    })
  
    return state;
}

function logout(state){
    localStorage.removeItem('access_token')
    
    return {
        ...state, isAuthenticated: false, token: null
    }
}

function setLocale(state, payload){
    return {
        ...state, currentLocale: payload, currentResource: payload === 'en' ? en : ar
    }
}

function updateConnectionStatus(state, payload){
    return {
        ...state, connectionStatus: payload
    }
}

export default reducer