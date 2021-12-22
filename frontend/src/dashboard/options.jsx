
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllYears ,getDashboardBarChat} from './dashboardActions'
import { bindActionCreators } from 'redux'


 class OptionsYear extends Component {
    componentWillMount() {
        this.props.getAllYears()
    }


    
    renderRows() {
        const allYears  = this.props.allYears || []
       
        return allYears.map(bc => (

            <option value={bc}>{bc}</option>

             ))
        
    }

  render() {
    return (
        <div>
            <div className=''> 
                <label>Ano</label>
                <select  name='year'  className='form-control'  onClick={(e) => this.props.getDashboardBarChat(e)}>
                    {this.renderRows()}           
                            
                 </select>
            </div>
            <div className='icon'> 
                            <i >.</i>
              </div>
           
       </div>
    );
  }
}


const mapStateToProps = state => ({allYears:state.dashboard.allYears})
const mapDispatchToProps = dispatch => bindActionCreators({getAllYears,getDashboardBarChat}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(OptionsYear)