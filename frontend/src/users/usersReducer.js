const INITIAL_STATE = { userslist : [],    searchDescripton :  '',  userCount : 0 }

export default (state = INITIAL_STATE, action) => {
 
    switch (action.type) {
     
        case 'ADMIN_FETCHED':
           // console.log('ADMIN_FETCHED'+action.payload.data)
            return { ...state, userslist:  action.payload.data}

        case 'ADMINCOUNT_FETCHED':
             console.log('admin')
               return { ...state, userCount:  action.payload.data}

         case 'SEARCH_FETCHED':
          // console.log('SEARCH_FETCHED'+action.payload)
          if(action.payload ==''){
            window.location.reload()
          }
            return { ...state, searchDescripton: action.payload}
        default:
            return state
    }
}

