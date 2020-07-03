import React from 'react'
import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {signIn} from '../../actions/AccountActions'
import {getFormData} from '../../helpers/form'

const SignIn = (props) => {
    const {signIn, account} = props

    if(account){
       return <Redirect to='/manage/links'/>
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const data = getFormData(e)
        signIn(data)
    }

    //console.log('sign account',account)

    return(
        <div className="container h-100 pt-5">
            <h1>Sign In</h1>
            <div className="d-flex flex-column h-100">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" required/>
                    </div>
                    <div>
                        <button className="btn btn-primary btn-round">Submit</button>
                    </div>
                </form>
                <div className="container text-center fixed-bottom pb-5">
                    <div className="text-muted">Não tem uma conta?</div>
                    <Link to='/sign-up'>Cadastra-se</Link>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {account: state.account.account}
}

export default connect(mapStateToProps, {signIn})(SignIn)