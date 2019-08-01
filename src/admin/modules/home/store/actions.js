import {
    LIST_USERS,
    CACHE_LIST,
} from './action-types'

export function listUsers(payload){
    return {
        type: LIST_USERS,
        payload
    }
}

export function cacheList(payload){
    return {
        type: CACHE_LIST,
        payload
    }
}

