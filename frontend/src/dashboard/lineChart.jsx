
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import { getDashboardGoalsList } from './dashboardActions'
import { bindActionCreators } from 'redux'

// http://recharts.org/en-US/examples/BarChartWithMultiXAxis
 // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
// const data = [
//   {
//     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//   },
//   {
//     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//   },
//   {
//     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//   },
//   {
//     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//   },
//   {
//     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//   },
//   {
//     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//   },
//   {
//     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//   },
// ];
 class GraficoLine extends Component {
    componentWillMount() {
        this.props.getDashboardGoalsList()
    }


    
    renderRows() {
        const dashboardgoalslist  = this.props.dashboardgoalslist || []
       
        return dashboardgoalslist.map(bc => (
        {name : bc.nameGoal  , 'nameGoal' : bc.valueGoal , Meta:bc.valueGoal, Depositado:bc.depositedAll, Falta:bc.difference}
             ))
        
    }

  render() {
//     const dashboardgoalslist  = this.props.dashboardgoalslist || []
//     const data2 = [] 
//    const  d = dashboardgoalslist.map(bc =>  (
//         console.log(bc.nameGoal+ " valor "+ bc.valueGoal +" depositado"+bc.depositedAll+" falta " +bc.difference)
       
//       ))
//           console.log(d)
        
    return (
        <div>
      <LineChart height={300}  width={600} data={this.renderRows()} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis  />
        <Tooltip />
        <Legend />
        <Line type="step" dataKey="Meta" stroke="green" activeDot={{ r: 8 }} />
        <Line type="step" dataKey="Depositado" stroke="blue" />
        <Line type="step" dataKey="Falta" stroke="red" />
      </LineChart></div>
    );
  }
}


const mapStateToProps = state => ({dashboardgoalslist : state.dashboard.dashboardgoalslist })
const mapDispatchToProps = dispatch => bindActionCreators({getDashboardGoalsList}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(GraficoLine)