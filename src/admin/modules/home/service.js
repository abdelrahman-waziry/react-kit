/* eslint-disable no-throw-literal */
import * as homeActions from './store/actions'

export function list(currentData, page, callback){
    return dispatch => {
        fetch(`https://reqres.in/api/unknown?page=${page}`).then(response => {
            if (!response.ok) {
            return response.json().then((err) => {
                throw { error: err, code: response.status }
            })
            }
            return response.json()
        }).then(data => {
            dispatch(homeActions.listUsers(data))
            dispatch(homeActions.cacheList({
                currentData: currentData, newData: data.data, lastPage: page
            }))
        })
        .catch(err => callback(err))
    }
}
