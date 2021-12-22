const INITIAL_STATE = { userOnlylist : [] }

export default (state = INITIAL_STATE, action) => {
   
    switch (action.type) {
        
        case 'USERONLY_FETCHED':
            
            //console.log('USERONLY_FETCHED '+action.payload.data)
            return { ...state, userOnlylist:  action.payload.data}

     
        default:
            //console.log('USERONLY_FETCHED d ')
            return state
    }
}

