import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { initUsers } from './usersActions'
import LabelAndInput from '../common/form/labelAndInput'
import   './users.css'
import If from '../common/operator/if'
import Grid from '../common/layout/grid'

// import Cale from './calendar'


class UsersForm extends Component {

    render() {
   
        const { handleSubmit, readOnly } = this.props
        console.log("teste 2 ")
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='name'component={LabelAndInput} readOnly={true}
                        label='Nome'  cols='12 3' placeholder='Informe o nome' />
                    <Field name='email' component={LabelAndInput}  readOnly={true}
                        label='E-mail' cols='12 2' placeholder='Informe o e-mail' />
                        <If test={this.props.showStatus}>
                    <Field className="showMe" name='password' component={LabelAndInput}  type='password' readOnly={readOnly}
                        label='Senha' cols='12 2' placeholder='Nova Senha' />   
                        </If>

                      <Grid cols='2'>
                        <div className='form-group'>
                            <label>Administrador</label>
                            <Field name='adm'  type="select" cols='12 2'  className='form-control' component="select">
                                <option value="SIM">SIM</option> 
                                <option value="NAO">NAO</option>
                            
                            </Field>
                        </div>
                        </Grid>   
                     {/* <Field name='adm' component={LabelAndInput} type='text' readOnly={readOnly}
                        label='adm' cols='12 2' placeholder='Informe '/>                            */}
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.initUsers}>Cancelar</button>
                </div>
            </form>
        )
    }
}

UsersForm = reduxForm({form: 'usersForm', destroyOnUnmount: false})(UsersForm)
const selector = formValueSelector('usersForm')

const mapDispatchToProps = dispatch => bindActionCreators({initUsers}, dispatch)
export default connect(null,mapDispatchToProps)(UsersForm)
