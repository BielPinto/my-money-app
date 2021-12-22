import axios from 'axios'
const BASE_URL = 'http://localhost:3003/api'

export function getSummary() {
    const request = axios.get(`${BASE_URL}/billingCycles/summary`)
  //  console.log("getsummy"+request)
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}

export function getBillingCyclesCount() {
    
    const request = axios.get(`${BASE_URL}/billingCycles/countOnly`)
  
    return {
        type: 'BILLING_COUNT_FETCHED',
        payload: request
    }
}
export function getCountMessage() {
    const request = axios.get(`${BASE_URL}/messageUser/messageCount`)
    console.log("entrou no countMessage"+request)
    return {
        type: 'MESSAGE_COUNT_FETCHED',
        payload: request
    }
}

export function getAllYears() {
    const request = axios.get(`${BASE_URL}/billingCycles/allYears`)
  //  console.log("getsummy"+request)
    return {
        type: 'BILLING_ALLYEAR_FETCHED',
        payload: request
    }
}

export function getDashboardBarChat(values) {
    // console.log(values.target.value)

    const year  =  {year :     values.target.value ? values.target.value : '2020'}
 

    const url = `${BASE_URL}/billingCycles/listaAnual`
    
    return dispatch => {
        axios.post(url, year)
            .then(resp => {
                dispatch([
                    { type: 'BILLING_BARCHAT_FETCHED',
                     payload : resp }
                ])
            })
            .catch(e => {
                e.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
            })
    }

}

export function getDashboardGoalsList() {
    
    const request = axios.get(`${BASE_URL}/goals/lista`)
   
    return {
        type: 'DASHBOARDGOALS_FETCHED',
        payload: request
    }
}

export function getDashboardGoalsCount() {
    
    const request = axios.get(`${BASE_URL}/goals/count`)
  
    return {
        type: 'DASHBOARDGOALSCOUNT_FETCHED',
        payload: request
    }
}



