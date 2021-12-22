import React, { PureComponent ,Component} from 'react';
import { connect } from 'react-redux'
import { Field} from 'redux-form'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { getDashboardBarChat } from './dashboardActions'
import { bindActionCreators } from 'redux'

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p  >{`Credito : ${payload[0].value}`} </p>
        <p  >{`Debito : ${payload[1].value}`} </p>
        <p  >{`Consolidado : ${payload[2].value}`} </p>
         {/* <p className="intro">{getIntroOfPage(label)}</p>  */}
         {/* <p className="desc">Anything you want can be displayed here.</p>  */}
      </div>
    );
  }

  return null;
};

 class BarChat extends Component {


renderRows() {

  const billingCyclesBarChat  = this.props.billingCyclesBarChat || []
 
  return billingCyclesBarChat.map(bc => (

    // {
    //   name: 'Jan.', credito: 4000, debito: 2400, amt: 2400,
    // }
    
  {name : bc.name  , Crédito : bc.allCredits , Débito:bc.allDebits ,Consolidado: ( bc.allCredits -bc.allDebits)}
       ))
  
}

  render() {
    return (
      <div >
      <BarChart width={600} height={300} data={this.renderRows()}
        margin={{  top: 5, right: 2, left: 2, bottom: 1 }} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="Crédito" barSize={20} fill="green" />
        <Bar dataKey="Débito" barSize={20} fill="red" />
        <Bar dataKey="Consolidado" barSize={20} fill="blue" />
      </BarChart>
       </div>
    );
  }
}


const mapStateToProps = state => ({billingCyclesBarChat : state.dashboard.billingCyclesBarChat })
const mapDispatchToProps = dispatch => bindActionCreators({getDashboardBarChat}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BarChat)

// export default props => (
//                         <BarChart
//                               width={props.width}
//                               height={props.height}
//                               data={props.value}
//                               margin={{
//                                 top: 5, right: 30, left: 20, bottom: 5,
//                               }}
//                             >
//                               <CartesianGrid strokeDasharray="3 3" />
//                               <XAxis dataKey="name" />
//                               <YAxis />
//                               {/* <Tooltip content={<CustomTooltip />} /> */}
//                               <Legend />
//                               <Bar dataKey="credito" barSize={10} fill="green" />
//                               <Bar dataKey="debito" barSize={10} fill="red" />
//                             </BarChart>
//                             )