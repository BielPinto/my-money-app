import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function login(values) {
    
    return submit(values, `${consts.OAPI_URL}/login`)
}
export function signup(values) {
    values.adm = 'NAO';
    return submit(values, `${consts.OAPI_URL}/signup`)
}
export function updadePassword(values) {
    return submit(values, `${consts.OAPI_URL}/updadePassword`)
}
export function forgotpassword(values) {
   
    return submit2(values, `${consts.OAPI_URL}/forgotpassword`) 
    
}
function submit(values, url) {

    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    { type: 'USER_FETCHED', payload: resp.data }
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
            })
    }
}

function submit2(values, url) {
   
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
               
                dispatch([
                   
                    { type: 'TOKEN_VALIDATED', payload: false }
                ])
                toastr.success(resp.data.success)
                 setInterval(() => {
                   window.location.reload()
                 }, 60000000);
               
            })
            .catch(e => {
                e.response.data.errors.forEach( error => toastr.error('Erro', error))
            })
    }
}




export function logout() {

    return { type: 'TOKEN_VALIDATED', payload: false }
}



export function validateToken(token) {
    return dispatch => {
        if (token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, { token })
                .then(resp => {
                    dispatch({ type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(e => dispatch({ type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({ type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}
  