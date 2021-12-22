import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { initGoals } from './goalsActions'
import LabelAndInput from '../common/form/labelAndInput'
import ItemListGoals from './itemListaGoals'
import Summary from './goalsSummary'
// import Cale from './calendar'


class GoalsForm extends Component {
    calculateSummary() {
        const sum = (t, v) => t + v
        
      
        return {
            sumDepositedAll: this.props.deposited.map(c => +c.value || 0).reduce(sum),
            sumValueGoal :  this.props.valueGoal || 0
        }
    }
 

    render() {
   
        const { handleSubmit, readOnly ,deposited} = this.props
        const { sumDepositedAll,sumValueGoal} = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className='box-body'>
                    <Field name='nameGoal'component={LabelAndInput} readOnly={readOnly}
                        label='Apelido Meta'  cols='12 3' placeholder='Informe o nome' />
                    <Field name='dateInit' component={LabelAndInput}  type='date' readOnly={readOnly}
                        label='Dt. Inicial' cols='12 2' placeholder='Informe a data Inicial' />
                    <Field name='dateEnd' component={LabelAndInput}  type='date' readOnly={readOnly}
                        label='Dt. Final' cols='12 2' placeholder='Informe a data Final' />
                    <Field name='valueGoal' component={LabelAndInput} type='number' readOnly={readOnly}
                        label='Valor Meta' cols='12 2' placeholder='Informe o Valor da Meta' />
                    <Summary valueGoal={sumValueGoal} depositedAll={sumDepositedAll} />
                    
                    <ItemListGoals cols='12 6' goalslist={deposited} readOnly={readOnly}
                        field='deposited' legend='Depositado' />
                                         
                </div>
                <div className='box-footer'>
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default'
                        onClick={this.props.initGoals}>Cancelar</button>
                </div>
            </form>
        )
    }
}

GoalsForm = reduxForm({form: 'goalsForm', destroyOnUnmount: false})(GoalsForm)
const selector = formValueSelector('goalsForm')
const mapStateToProps = state => ({
    deposited: selector(state, 'deposited'),
    valueGoal: selector(state, 'valueGoal'),
    depositedAll: selector(state, 'depositedAll')
})
const mapDispatchToProps = dispatch => bindActionCreators({initGoals}, dispatch)
export default connect( mapStateToProps,mapDispatchToProps)(GoalsForm)