import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'

export function getUsersList() {
    const request = axios.get(`${BASE_URL}/admin/lista`)
      //  console.log("dentro da lista actions "+ request)
    return {
        type: 'ADMIN_FETCHED',
        payload: request
    }
}



export function getUsersCount() {
    const request = axios.get(`${BASE_URL}/admin/count`)
     // console.log("dentro da actions count "+ request)
    return {
        type: 'ADMINCOUNT_FETCHED',
        payload: request
    }
}



export function createUsers(values) {
    const  partes = sessionStorage["_mymoney_user"].split('",')[0];
    const idUser = partes.split(':"')[1]
    values['matricula'] = idUser
    return submitUsers(values, 'post')
}

export function updateUsers(values) {
   // console.log("updateUsers "+values)
    return submitUsers(values, 'put')
}
function refresh(){

}

export function removeUsers(values) {
  // console.log("removeUsers "+values)
    return submitUsers2(values, 'post')
}

export function handleUsers(values){
   
    const request = values.target.value !='' ?values.target.value : ''
    //console.log("sear"+ request)
    return {
        type: 'SEARCH_FETCHED',
        payload: request
    }

}

export function searchUsers(values) {
    const search = values !='' ?values: ''
 if(values != ''){
    const request =  axios.get(`${BASE_URL}/admin/?name=${search}`)
    request.then(resp=>console.log(resp.data))
       
     return {
        type: 'ADMIN_FETCHED',
        payload: request
    }
}
 }
 

function submitUsers(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        //console.log("teste 2 "+id)
        axios[method](`${BASE_URL}/admin/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso Users.')
                dispatch(initUsers())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

function submitUsers2(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
        //console.log("teste 2 "+id)
        axios[method](`${BASE_URL}/admin/clearUser`, values)
            .then(resp => {

                toastr.success('Sucesso', 'Operação Realizada com sucesso Users.')
                dispatch(initUsers())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}
function  submitBillis(values, method){
   
        const id = values._id ? values._id : ''
            console.log("teste 2 "+id)
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                
               
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    
}
function  submitGoals(values, method){
    
        const id = values._id ? values._id : ''
        console.log("submitGoals 2 "+id)
        axios[method](`${BASE_URL}/goals/${id}`, values)
            .then(resp => {
              
               
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    
}


export function showUpdateUsers(users) {
   //console.log("showUpdateUsers "+users);
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('usersForm', users)
    ]
}



export function showDeleteUsers(users) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('usersForm', users)
    ]
}

export function initUsers() {
     return [
        showTabs('tabList', 'tabCreate'),
         selectTab('tabList'),
         getUsersList(),
         initialize('usersForm')
     ]
 }
