import * as authActions from './store/actions'
import { postResource } from '../../../network';

export function login(payload, callback){
    return dispatch => {
        var body = JSON.stringify(payload)
        fetch('https://reqres.in/api/login', {
            method: "post",
            body: body,
            headers: {
                "Content-type" : "application/json"
            }
        }).then(response => {
            if (!response.ok) {
            return response.json().then((err) => {
                throw { error: err, code: response.status }
            })
            }
            return response.json()
        }).then(data => dispatch(authActions.authLogin(data.token)))
        .then(() => {
            callback()
        })
        .catch(err => dispatch(authActions.authLogin(err)))
    }
}

export function register(payload, callback){
    return dispatch => {
        postResource('/api/Account/Register', JSON.stringify(payload), (data) => {
            dispatch(authActions.authLogin(data.data.responseData.accessToken))
            callback(data)
        }, error => callback(error))
    }
}