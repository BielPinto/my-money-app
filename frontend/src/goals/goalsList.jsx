import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getGoalsList ,showUpdateGoals ,showDeleteGoals,searchGoals,handleGoals} from './goalsActions'
import Grid from '../common/layout/grid'
import IconButton from '../common/template/iconButton'


class GoalsList extends Component {

    componentWillMount() {
        this.props.getGoalsList()
        return {
            searchGoalsDescripton: this.props.searchGoalsDescripton
        }
    }
   

    renderRows() {
        const goalslist = this.props.goalslist || []
       
        return goalslist.map(bc => (
                <tr key={bc._id}>
                    <td>{bc.nameGoal}</td>
                    <td>{bc.dateInit}</td>
                    <td>{bc.dateEnd}</td>
                    <td>{bc.valueGoal}</td>
                    <td > {bc.depositedAll} </td>
                    <td>{bc.difference}</td>
                    <td className='showMe'>{bc.matricula}</td>
                    <td>
                        <button className='btn btn-warning' onClick={() => this.props.showUpdateGoals(bc)}>
                            <i className='fa fa-pencil'></i>
                        </button>
                        <button className='btn btn-danger' onClick={() => this.props.showDeleteGoals(bc)}>
                            <i className='fa fa-trash-o'></i>
                        </button>
                    </td>
                </tr>
             ))
        
    }

    render() {
        const {searchGoalsDescripton} = this.props 
        return (
            <div>

            {/* <Grid cols='12 3 2'>
                            <input id='searchGoals' className='form-control'placeholder='Pesquisar' 
                            onChange={this.props.handleGoals}></input>
                                    
            </Grid>
             <Grid cols='12 3 2'>
                                <IconButton style='info' icon='search' onClick={() => this.props.searchGoals(searchGoalsDescripton)}  >

                                    </IconButton> 
                            </Grid> */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Apelido Meta</th>
                            <th>Dt. Inicial</th>
                            <th>Dt.Final</th>
                            <th>Valor Meta</th>
                            <th>Creditado</th>
                            <th>Falta</th>
                            <th className='table-actions'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({goalslist: state.goals.goalslist,searchGoalsDescripton : state.goals.searchGoalsDescripton})
const mapDispatchToProps = dispatch => bindActionCreators({getGoalsList,showUpdateGoals,showDeleteGoals,handleGoals,searchGoals}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(GoalsList)

