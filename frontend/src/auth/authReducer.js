const userKey = '_mymoney_user'
const INITIAL_STATE = {
    user: JSON.parse(sessionStorage.getItem(userKey)),
  // user: {name: 'gabriel', email:'gabriel@hotmail.com'},
    validToken: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'TOKEN_VALIDATED':
            if (action.payload) {
             // console.log("entrou no  tojen  true")
                return { ...state, validToken: true }
            } else {
             //   console.log("entrou no  tojen  false")
                sessionStorage.removeItem(userKey)
               window.location.href = 'http://localhost:8080/#/'
                window.location.reload()
                return { ...state, validToken: false, user: null }
            }
        case 'USER_FETCHED':
          
           sessionStorage.setItem(userKey, JSON.stringify(action.payload))
            return { ...state, user: action.payload, validToken: true }
        default:
           
            return state
    }
}
