import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { initUserOnly } from './userOnlyActions'
import LabelAndInput from '../common/form/labelAndInput'
import   '../users/users.css'
import If from '../common/operator/if'

// import Cale from './calendar'


class UserOnlyForm extends Component {

    render() {
   
        const { handleSubmit, readOnly } = this.props
        
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name'component={LabelAndInput} readOnly={true}
                        label='Nome'  cols='12 4' placeholder='Informe o nome' />
                    <Field name='email' component={LabelAndInput}  readOnly={true}
                        label='E-mail' cols='12 4' placeholder='Informe o e-mail' />
                        <If test={this.props.showStatus}>
                    <Field className="showMe" name='password' component={LabelAndInput}  type='password' readOnly={readOnly}
                        label='Senha' cols='12 4' placeholder='Nova Senha' />   
                        </If>
                        {/* <Field name='adm' component={LabelAndInput}  type="select"   cols='12 2' label='adm'
                            optionValue="1">
                            <option value="1">1</option> 
                            <option value="2">2</option>
                        
                         </Field>  */}
                     <Field name='adm' component={LabelAndInput} type='text' readOnly={true}
                        label='Administrador' cols='12 2' placeholder='Informe '/>                           
                </div>
                <div className='box-body'>
                <Field className="showMe" name='password_new' component={LabelAndInput}  type='password' readOnly={readOnly}
                        label='trocar senha' cols='12 4' placeholder='Nova Senha' />  
                        
                  <Field className="showMe" name='confirm_password' component={LabelAndInput}  type='password' readOnly={readOnly}
                       label='*' cols='12 4' placeholder='Repetir Senha' />  
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.initUserOnly}>Cancelar</button>
                </div>
            </form>
        )
    }
}

UserOnlyForm = reduxForm({form: 'userOnlyForm', destroyOnUnmount: false})(UserOnlyForm)
const selector = formValueSelector('userOnlyForm')

const mapDispatchToProps = dispatch => bindActionCreators({initUserOnly}, dispatch)
export default connect(null,mapDispatchToProps)(UserOnlyForm)
