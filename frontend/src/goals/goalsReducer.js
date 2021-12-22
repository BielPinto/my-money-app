const INITIAL_STATE = { goalslist : [] ,    searchGoalsDescripton :  '', goalsCount: 0 }

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GOALS_FETCHED':
            return { ...state, goalslist:  action.payload.data}
            
        case 'GOALSCOUNT_FETCHED':
          return { ...state, goalsCount:  action.payload.data}   

        case 'SEARCHGOALS_FETCHED':
          // console.log('SEARCH_FETCHED'+action.payload)
          if(action.payload ==''){
            window.location.reload()
          }
            return { ...state, searchGoalsDescripton: action.payload}
        default:
            return state
    }
}