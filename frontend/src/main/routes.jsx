import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import BillingCycle from '../billingCycle/billingCycle'
import Goals from '../goals/goals'
import Users from '../users/users'
import MessageAdmin from '../messageAdmin/messageAdmin'
import UserOnly from '../userOnly/userOnly'
import Message from '../message/message'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='billingCycles' component={BillingCycle} />
            <Route path='goals' component={Goals} />
            <Route path='admin' component={Users} />
            <Route path='messageAdmin' component={MessageAdmin} />
            <Route path='userOnly' component={UserOnly} />
            <Route path='messageUser' component={Message} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)