import React, {useEffect} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

import Home from './screens/Home/index'
import SignIn from './screens/SignIn/index'
import SignUp from './screens/SignUp/index'
import ManageLinks from './screens/Manage/Links/index'
import Create from './screens/Manage/Links/Create/index'
import Edit from './screens/Manage/Links/Edit/index'

import {initAccount} from './actions/AccountActions'

const App = ({initAccount}) => {

    useEffect(() => {
        initAccount()
    }, [initAccount])

    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path='/sign-in'><SignIn /></Route>
                    <Route path='/sign-up'><SignUp /></Route>
                    <Route path='/manage/links/create'><Create/></Route>
                    <Route path='/manage/links/edit/:id'><Edit/></Route>
                    <Route path='/manage/links'><ManageLinks /></Route>
                    <Route exact path='/'><Home/></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = (state) => {
    return {account: state.account.account}
}

export default connect(mapStateToProps, {initAccount})(App)