import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'
import Goals from '../goals/goalsReducer'
import Users from '../users/usersReducer'
import MessageAdmin from '../messageAdmin/messageAdminReducer'
import UserOnly from '../userOnly/userOnlyReducer'
import Message from '../message/messageReducer'
import AuthReducer from '../auth/authReducer'

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    tab: TabReducer,
    billingCycle: BillingCycleReducer,
    goals: Goals,
    users: Users,
    messageAdmin: MessageAdmin,
    userOnly: UserOnly,
    message: Message,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer
})

export default rootReducer