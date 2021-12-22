const INITIAL_STATE = { listMessageAdmin : [] , answered : 0, notAnswered :0 }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MESSAGEADMIN_FETCHED':
            
            return { ...state, listMessageAdmin :  action.payload.data}
        case 'MESSAGE_ANSWERED_FETCHED':
           // console.log("MESSAGEADMINCOUNT_FETCHED "+action.payload.data)
            return { ...state, answered :  action.payload.data}

        case 'MESSAGE_NOT_ANSWERED_FETCHED':
              //  console.log("MESSAGEADMINCOUNT_FETCHED "+action.payload.data) 
            
                return { ...state, notAnswered :  action.payload.data}   
        default:
            return state
    }
}