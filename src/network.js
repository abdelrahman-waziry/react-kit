/* eslint-disable no-throw-literal */

import store from '../src/store'
import { authLogout } from './admin/modules/auth/store/actions';
import { responseMessages } from './resources/responseMessages';

var headers = new Headers()
headers.set('Accept', 'application/json')
headers.set('Content-type', 'application/json')

function setToken(){
    const token = localStorage.getItem('access_token')
    if(token){
        headers.set('Authorization', `Bearer ${token}`)
    }
    else {
        store.dispatch(authLogout())
    }
}

async function handleResponse(response, onSuccess, onFailure) {
    try {
        if(navigator.onLine){
            if(!response.ok){
                const data = await response.json()
                handleHttpErrors(data, response.status)
            }
            else {
                const data = await response.json()
                if(data.responseCode === 200){
                    onSuccess({data: data, code: 200})
                }
                else {
                    let errors = data.responseCode === 105 ? data.validationList : [responseMessages[data.responseCode]]
                    throw { errors: errors, code: data.responseCode }
                }
            }
        }
        else {
            throw { errors: ['No internet connection, please try again!'], code: 503 }
        }
    } catch (error) {
        onFailure(error)
    }
}

function handleHttpErrors(data, code) {
    switch (code) {
        case 401:
            throw { errors: ['Not authorized'], code: code }
    
        default:
            throw { errors: [data.responseMessage ? data.responseMessage : 'Something went wrong'], code: code }
    }
}

export const getResource = async (route, onSuccess, onFailure) => {
    setToken()
    const response = await fetch(route, {headers})
    await handleResponse(response, (data) => {
        onSuccess({data: data, code: 200})
    }, (error) => {
        onFailure(error)
    })
    
}

export const postResource = async (route, body, onSuccess, onFailure) => {  
    setToken()
    const response = await fetch(route,{headers, body, method: 'post'})
    await handleResponse(response, (data) => {
        onSuccess(data)
    }, (error) => {
        onFailure(error)
    })
}

export const patchResource = async (route, body, onSuccess, onFailure) => {  
    setToken()
    const response = await fetch(route,{headers, body, method: 'patch'})
    await handleResponse(response, (data) => {
        onSuccess(data)
    }, (error) => {
        onFailure(error)
    })
}

export const deleteResource = async (route, onSuccess, onFailure) => {  
    setToken()
    const response = await fetch(route,{headers, method: 'delete'})
    await handleResponse(response, (data) => {
        onSuccess(data)
    }, (error) => {
        onFailure(error)
    })
}