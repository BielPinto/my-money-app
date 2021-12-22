import axios from 'axios'
import moment from 'moment'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'



export function getListMessage() {
    const request = axios.get(`${BASE_URL}/messageUser/lista`)

    return {
        type: 'MESSAGE_FETCHED',
        payload: request
    }
}

export function create(values) {
    const keyUser  = JSON.parse(sessionStorage["_mymoney_user"])

   console.log(")craet")
    values['matricula'] = keyUser.user._id
    values['name'] =  keyUser.user.name
    values['dateMessage'] = moment(Date()).format("DD/MM/YYYY")
    values['userSend'] =  'SIM'
    values['adminSend'] =  'NAO'
    return submit(values, 'post')
}

export function update(values) {
    const keyUser  = JSON.parse(sessionStorage["_mymoney_user"])
   
    console.log("vier"+moment(Date()).format("DD/MM/YYYY"))
    values['dateMessage'] =  moment(Date()).format("DD/MM/YYYY")
    values['userSend'] =  'SIM'
    values['adminSend'] =  'NAO'

    return submit(values, 'put')
}


export function vier() {
  console.log("vier")
   return initMessage()
   
}



export function remove(values) {
    return submit(values, 'delete')
}

function submit(values, method) {
    
    return dispatch => {
        const id = values._id ? values._id : ''
    
        axios[method](`${BASE_URL}/messageUser/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso.')
                dispatch(initMessage())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdate(message) {


    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('messageForm', message)
    ]
}

export function showVier(message) {
    return [ 
        showTabs('tabVier'),
        selectTab('tabVier'),
        initialize('messageForm', message)
    ]
}

export function showDelete(message) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('messageForm', message)
    ]
}

export function initMessage() {
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getListMessage(),
        initialize('messageForm')
    ]
}