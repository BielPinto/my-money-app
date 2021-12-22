
import { connect } from 'react-redux'
import { getDashboardGoalsList, getSummary } from './dashboardActions'
import { bindActionCreators } from 'redux'


import React, { Component } from 'react';
import {
  PieChart, Pie, Sector, Cell,Tooltip,
} from 'recharts';

const data = [
  { name: 'Credito', value: 2500 },
  { name: 'Debito', value: 2088 },
  { name: 'Consolidado', value: 412 },
  
];




const COLORS = ['green', 'red', 'blue'];

class GraficoPiechat extends Component {

  componentWillMount() {
            this.props.getSummary()
        }
    
    
        
        renderRows() {
            const dashboardgoalslist  = this.props.dashboardgoalslist || []
            const { credit, debt } = this.props.summary
             const consolidado = credit - debt
            const data = [
              { name: 'Credito', value: credit },
              { name: 'Debito', value: debt },
              { name: 'Consolidado', value:consolidado  },
              
            ];

            return data
        }


  render() {
      const data=  this.renderRows()
    return (
      <PieChart width={400} height={400}>
        <Pie
        isAnimationActive={false}  
        data={data}cx={200}
        cy={200}  
        labelLine={true} 
         outerRadius={80}
          fill="#8884d8"
          dataKey="value"
         
        >
            
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip  />
     
      </PieChart>
    );
  }
}
const mapStateToProps = state => ({summary: state.dashboard.summary,dashboardgoalslist : state.dashboard.dashboardgoalslist })
const mapDispatchToProps = dispatch => bindActionCreators({getDashboardGoalsList, getSummary}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(GraficoPiechat)