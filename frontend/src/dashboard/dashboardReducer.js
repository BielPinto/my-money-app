const INITIAL_STATE =   {summary: {credit: 0, debt: 0},
                         billingCyclesUser: 0,   
                         dashboardgoalslist :[] ,
                         billingCyclesBarChat:[],
                         allYears : [],
                         goalsCount : 0 ,
                         messageUser : 0 
                        }

export default (state = INITIAL_STATE, action) =>  {
    switch (action.type) {
        case 'BILLING_SUMMARY_FETCHED':
        //console.log('BILIN '+action.payload.data)
            return { ...state, summary: action.payload.data } 
        case 'BILLING_COUNT_FETCHED':
                //console.log('BILIN '+action.payload.data)
                    return { ...state, billingCyclesUser: action.payload.data }

        case 'BILLING_ALLYEAR_FETCHED':
        
            return { ...state, allYears: action.payload.data }
        case 'MESSAGE_COUNT_FETCHED':
            console.log("MESSAGE_COUNT_FETCHED")
        
            return { ...state, messageUser: action.payload.data }

        case 'BILLING_BARCHAT_FETCHED':
       
             return { ...state, billingCyclesBarChat: action.payload.data }
  
        case 'DASHBOARDGOALSCOUNT_FETCHED':
       // console.log('DASHBOARDUSERSCOUNT_FETCHED '+action.payload.data)
            return { ...state, goalsCount: action.payload.data }

        case 'DASHBOARDGOALS_FETCHED':
          // console.log('GOALS_FETCHED'+action.payload.data)
            return { ...state, dashboardgoalslist: action.payload.data}
        default:
            return state
    }
}