const INITIAL_STATE = { listMessage : [] }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MESSAGE_FETCHED':
           
            return { ...state, listMessage:  action.payload.data}
        default:
            return state
    }
}