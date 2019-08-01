/**
 * Import actions here
 */
import {
    LIST_USERS, CACHE_LIST 
} from './action-types'


/**
 * Module internal initial state
 */
const initialState = {
    users: [],
    cachedUsers: [],
    lastPage: 0,
};  


/**
 * Checks dispatched actions and updates state accordingly
 * @param {Object} state 
 * @param {Object} action 
 * @returns {Function} 
 */

const reducer = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case LIST_USERS:
            return list(state, payload)
        case CACHE_LIST: 
            return cacheList(state, payload)
        default:
            return state;
    }
} 

/**
 * Returns an updated version of the state based on the action
 * @param {Object} state 
 * @param {Object} payload 
 * @return {Object} state
 */
function list(state, payload) {
    return {
      ...state, users: payload
    }
}

function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
}

function cacheList(state, payload){
    const cachedUsers =  [...new Set(payload.currentData.concat(...payload.newData))];
    var unique = removeDuplicates(cachedUsers, 'id')
    return {   
        ...state, cachedUsers: unique, lastPage: payload.lastPage
    }

}

export default reducer