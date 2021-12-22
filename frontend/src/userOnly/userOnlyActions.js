import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

export function getUserOnlyList() {
    
    const request = axios.get(`${BASE_URL}/userOnly/lista`)
      //console.log("dentro da lista userOnly "+ request)
    return {
        type: 'USERONLY_FETCHED',
        payload: request
    }
}



export function updateUserOnly(values) { 
    console.log("updateUsers "+values)
    return submitUpdate(values, `${BASE_URL}/userOnly/updadePassword`)
}
 

function submitUserOnly(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        //console.log("teste 2 "+id)
        axios[method](`${BASE_URL}/userOnly/${id}`, values)
            .then(resp => {
                
                toastr.success('Sucesso', 'Operação Realizada com sucesso Users.')
                dispatch(initUserOnly())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

function submitUpdate(values, url) {

    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso !.')
                dispatch([
                    { type: 'USERONLY_FETCHED', payload: resp.data }
                ,initUserOnly()])

            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
            })
    }
}


export function showUpdateUserOnly(userOnly) {
    console.log("showUpdateUsers "+userOnly);
     return [ 
         showTabs('tabUpdate'),
         selectTab('tabUpdate'),
         initialize('userOnlyForm', userOnly)
     ]
 }



export function showDeleteUserOnly(userOnly) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('userOnlyForm', userOnly)
    ]
}

export function initUserOnly() {
     return [
        showTabs('tabList', 'tabCreate'),
         selectTab('tabList'),
         getUserOnlyList(),
         initialize('userOnlyForm')
     ]
 }
