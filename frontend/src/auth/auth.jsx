import './auth.css'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup,forgotpassword} from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: 'login' }
        this.state = { camposModo: {
            'name':true,
            'email': false,
            'password':false,
            'confirm_password':true,
            'new_password':true,
            
            'botao': 'Entrar'
              }
             }

    }

    changeMode(Mode) {
        if(Mode == undefined){
            this.setState({ loginMode: 'login'})
            this.state.camposModo.name = true
            this.state.camposModo.email = false
            this.state.camposModo.password = false
            this.state.camposModo.confirm_password = true 
            this.state.camposModo.new_password = true
            this.state.camposModo.botao = 'Entrar'
        }
    
        if(Mode == 'login'){
            this.setState({ loginMode: 'login'})
            this.state.camposModo.name = true
            this.state.camposModo.email = false
            this.state.camposModo.password = false
            this.state.camposModo.confirm_password = true 
            this.state.camposModo.new_password = true
            this.state.camposModo.botao = 'Entrar'
        }
         if(Mode == 'forgot'){
            this.setState({ loginMode: 'forgot' })
            this.state.camposModo.name = true
            this.state.camposModo.email = false
            this.state.camposModo.password = true
            this.state.camposModo.confirm_password = true
            this.state.camposModo.new_password = true
            this.state.camposModo.botao = 'Enviar'
            
        } 
  
         if(Mode == 'singup'){
            this.setState({ loginMode: 'singup'})
            this.state.camposModo.name = false
            this.state.camposModo.email = false
            this.state.camposModo.password = false
            this.state.camposModo.confirm_password = false
            this.state.camposModo.new_password = true
            this.state.camposModo.botao = 'Registrar'
    
        }

    }


    onSubmit(values) {
        const { login, signup ,forgotpassword} = this.props
        // this.state.loginMode ? login(values) : signup(values)
        if(this.state.loginMode == undefined){
            login(values)
         //   console.log(values)
         }
        if(this.state.loginMode == 'login'){
           login(values)
          //  console.log(values)
        }
        if(this.state.loginMode == 'forgot'){
            forgotpassword(values)
          //  console.log(values)
         } 
     
         if(this.state.loginMode == 'singup'){
            signup(values)
          //  console.log(values)
         }   
    }

    render() {
        const { camposModo } = this.state
        const { handleSubmit } = this.props
        return (
            <div className="login-box">
                <div className="login-logo"><b> My</b> Money</div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                        <Field component={Input} type="input" name="name"
                            placeholder="Nome" icon='user' hide={camposModo.name} />
                        <Field component={Input} type="email" name="email"
                            placeholder="E-mail" icon='envelope' hide={camposModo.email} />
                        <Field component={Input} type="password" name="password"
                            placeholder="Senha" icon='lock' hide={camposModo.password}/>
                        <Field component={Input} type="password" name="password_new"
                            placeholder="Nova Senha" icon='lock' hide={camposModo.new_password}/>
                        <Field component={Input} type="password" name="confirm_password"
                            placeholder="Confirmar Senha" icon='lock' hide={camposModo.confirm_password} />
                        <Row>
                            <Grid cols="4">
                                <button type="submit"
                                    className="btn btn-primary btn-block btn-flat"  >
                                    {camposModo.botao }
                                </button>
                            </Grid>
                        </Row>
                        <br />
                        <Row>
                            <Grid cols="2" >
                            <a  onClick={() =>  this.changeMode('login')}>login!</a>
                            </Grid>
                            <Grid cols="3">
                            <a onClick={() =>  this.changeMode('singup')} >Cadastrar!</a>
                            </Grid>
                            <Grid cols="2">
                            <a onClick={() => this.changeMode('forgot')} >esqueci</a>
                            </Grid>
                        </Row>
                    </form> 
                </div>
                <Messages />
            </div>

        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup, forgotpassword  }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)