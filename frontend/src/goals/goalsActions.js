import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api'
const INITIAL_VALUES = {deposited: [{}]}


export function getGoalsList() {
    
    const request = axios.get(`${BASE_URL}/goals/lista`)

    return {
        type: 'GOALS_FETCHED',
        payload: request
    }
}

export function getGoalsCount() {
    const request = axios.get(`${BASE_URL}/goals/count`)
     
    return {
        type: 'GOALSCOUNT_FETCHED',
        payload: request
    }
}

export function createGoals(values) {
    const  partes = sessionStorage["_mymoney_user"].split('",')[0];
    const idUser = partes.split(':"')[1]
    values['matricula'] = idUser
    return submitGoals(values, 'post')
}

export function updateGoals(values) {
   
    return submitGoals(values, 'put')
}

export function removeGoals(values) {
 
    return submitGoals(values, 'delete')
}

export function handleGoals(values){
   
    const request = values.target.value !='' ?values.target.value : ''
   
    return {
        type: 'SEARCHGOALS_FETCHED',
        payload: request
    }

}

export function searchGoals(values) {
    const search = values !='' ?values: ''
    const matricula = '5ebf42e37c4f2330048a9b5e'
 if(values != ''){
    const request =  axios.get(`${BASE_URL}/goals/?matricula=${matricula}&nameGoal=${search}`)
    request.then(resp=>console.log(resp.data))
       
     return {
        type: 'GOALS_FETCHED',
        payload: request
    }
}
 }

function submitGoals(values, method) {
    return dispatch => {
        const id = values._id ? values._id : ''
       // console.log("teste 2 "+id)
        axios[method](`${BASE_URL}/goals/${id}`, values)
            .then(resp => {
                toastr.success('Sucesso', 'Operação Realizada com sucesso goals.')
                dispatch(initGoals())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error('Erro', error))
            })
    }
}

export function showUpdateGoals(goals) {
  //  console.log("showUpdateGoals "+goals);
    return [ 
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('goalsForm', goals)
    ]
}


export function showDeleteGoals(goals) {
    return [ 
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('goalsForm', goals)
    ]
}

export function initGoals() {
    console.log("init Goals")
     return [
        showTabs('tabList', 'tabCreate'),
         selectTab('tabList'),
         getGoalsList(),
         initialize('goalsForm', INITIAL_VALUES)
     ]
 }
