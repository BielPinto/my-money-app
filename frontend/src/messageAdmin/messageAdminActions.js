import axios from 'axios'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'


export function getListMessageAdmin() {
    const request = axios.get(`${BASE_URL}/messageAdmin/lista`)
console.log('teste')
    return {
        type: 'MESSAGEADMIN_FETCHED',
        payload: request
    }
}

export function getListMessageAdminAnswered() {
    const request = axios.get(`${BASE_URL}/messageAdmin/answered`)
   
//console.log("")
    return {
        type: 'MESSAGE_ANSWERED_FETCHED',
        payload: request
    }
}

export function getListMessageAdminNotAnswered() {
    const request = axios.get(`${BASE_URL}/messageAdmin/notAnswered`)
//console.log("")
    return {
        type: 'MESSAGE_NOT_ANSWERED_FETCHED',
        payload: request
    }
}

export function create(values) {
   
    return submit(values, 'post')
}

export function update(values) {
    const keyUser  = JSON.parse(sessionStorage["_mymoney_user"])
    
    
    if(values.respAdmin !=''){
    values['matriAdmin'] = keyUser.user._id
    values['nomeAdmin'] =  keyUser.user.name
    values['dateResp'] =  moment(Date()).format("DD/MM/YYYY")
    values['adminSend'] = 'SIM'
    return submit(values, 'put')
    }
   
    initMessageAdmin()
}

export function vier() {
    console.log("vier")
     return initMessageAdmin()
     
  }

export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    
    return dispatch => {
        const id = values._id ? values._id : ''
    
        axios[method](`${BASE_URL}/messageAdmin/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(initMessageAdmin())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(messageAdmin) {


    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('messageAdminForm', messageAdmin)
    ]
}

export function showVier(messageAdmin) {
    return [ 
        showTabs('tabVier'),
        selectTab('tabVier'),
        initialize('messageAdminForm', messageAdmin)
    ]
}

export function showDelete(messageAdmin) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('messageAdminForm', messageAdmin)
    ]
}

export function initMessageAdmin() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getListMessageAdmin(),
        initialize('messageAdminForm')
    ]
}