import {
    AUTH_LOGIN,
    AUTH_CHECK,
    AUTH_LOGOUT,
    SET_LOCALE,
    UPDATE_CONNECTION_STATUS,
} from './action-types'

export function authLogin(payload){
    return {
        type: AUTH_LOGIN,
        payload,
    }
}

export function authCheck(){
    return {
        type: AUTH_CHECK
    }
}

export function authLogout(){
    return {
        type: AUTH_LOGOUT
    }
}

export function setLocale(payload){
    return {
        type: SET_LOCALE,
        payload,
    }
}

export function updateConnectionStatus(payload){
    return {
        type: UPDATE_CONNECTION_STATUS,
        payload,
    }
}