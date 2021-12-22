import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { initMessageAdmin } from './messageAdminActions'
import LabelAndInput from '../common/form/labelAndInput'
import LabelAndTextArea from '../common/form/labelAndTextArea'
import Grid from '../common/layout/grid'
import If from '../common/operator/if'



class MessageAdminForm extends Component {
    
  

    render() {
        const { handleSubmit, readOnly,eye } = this.props
      
       //console.log("formulario")
        return (
            <form role='form' onSubmit={handleSubmit}>
                 <div className='box-body'>
                  <Grid cols='12 4'>
                        <div className='form-group'>
                            <label>Titulo</label>
                            <Field name='titulo'  type="select"   className='form-control' component="select" readOnly={true}>
                                <option value="">...</option> 
                                <option value="ELOGIOS">ELOGIOS</option> 
                                <option value="RECLAMACAO">RECLAMACAO</option>
                                <option value="OUTROS">OUTROS</option>
                            
                            </Field>
                        </div>
                  </Grid>

                  </div>
                <div className='box-body'>
              
                    {/* <Field name='titulo' component={LabelAndInput} readOnly={readOnly}
                        label='Titulo' cols='2' placeholder='' /> */}
                    <Field name='name' component={LabelAndInput} type='text' readOnly={true}
                        label='Nome' cols='6' placeholder='' />
                    <Field name='dateMessage' component={LabelAndInput} type='text' readOnly={true}
                        label='Aberto em' cols='6' placeholder='' />

                </div>
                
                <div className='box-body'>
                     <Field name='comments' component={LabelAndTextArea}  readOnly={true}
                        label='comments' cols='12' placeholder='' />
                </div>
                <div className='box-body'>
                     <Field name='nomeAdmin' component={LabelAndInput} type='text' readOnly={true}
                        label='Admistradro' cols='6' placeholder='' />
                    <Field name='dateResp' component={LabelAndInput} type='text' readOnly={true}
                        label='Data Resp.' cols='6' placeholder='' />
                </div>
                <div className='box-body'>
                                 
                    <Field name='respAdmin' component={LabelAndTextArea} type='text' readOnly={readOnly}
                        label='Resposta ' cols=' 12' placeholder='' />
                </div>
                <div className='box-footer'>
                <If test={eye}> 
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                 </If>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.initMessageAdmin}>Cancelar</button>
                </div>
            </form>
        )
    }
}

MessageAdminForm = reduxForm({form: 'messageAdminForm', destroyOnUnmount: false})(MessageAdminForm)

const selector = formValueSelector('messageAdminForm')

const mapDispatchToProps = dispatch => bindActionCreators({initMessageAdmin}, dispatch)
export default connect(null, mapDispatchToProps)(MessageAdminForm)