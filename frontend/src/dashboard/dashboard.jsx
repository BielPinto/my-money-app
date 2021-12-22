import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { getSummary ,getBillingCyclesCount,getDashboardGoalsCount ,getAllYears,getDashboardBarChat, getCountMessage} from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from  '../common/widget/valueBox'
import Row from  '../common/layout/row'
import LineChart  from './lineChart'
import PieChart from  './pieChart'
import Select  from './options'
import BarChat from  './barChat'
import DataChart from  './datachart'
import Grid from '../common/layout/grid'


class Dashboard extends Component {

    componentWillMount() {
        this.props.getSummary(),
        this.props.getBillingCyclesCount(),
        this.props.getDashboardGoalsCount(),
        this.props.getAllYears(),
        this.props.getCountMessage()

    }

   

    render() {
        
        const { credit, debt } = this.props.summary
        const  {goalsCount} = this.props.goalsCount
        const  { messageUser } = this.props.messageUser 
        const  {billingCyclesUser} = this.props.billingCyclesUser
        const  allYears = this.props.allYears 
       console.log("aqui ")

        return (
            <div> 
                <ContentHeader title='Dashboard' small='Versão 1.0' />
                <Content>
                    <Row> 
                        <ValueBox cols='12 4' color='green' icon='bank'
                            value={`R$ ${credit}`} text='Total de Créditos' />
                        <ValueBox cols='12 4' color='red' icon='credit-card'
                            value={`R$ ${debt}`} text='Total de Débitos' />
                        <ValueBox cols='12 4' color='blue' icon='money'
                            value={`R$ ${credit - debt}`} text='Valor Consolidado' />
                    </Row> 
                    {/* <Row> 
                        <ValueBox cols='12 4' color='green' icon='check-square'
                            value="0" text='Total Pagos' />
                        <ValueBox cols='12 4' color='red' icon='square-o'
                           value="0" text='Total Pendente' />
                        <ValueBox cols='12 4' color='blue' icon='clock-o'
                            value="0" text='Total Agendado' />
                    </Row>  */}
                    <Row>
                        <ValueBox cols='12 4' color='aqua' icon='life-ring' value={goalsCount} text='Metas' />
                        <ValueBox cols='12 4' color='orange' icon='usd' value={billingCyclesUser} text='Ciclos de Pagamentos' />
                        <ValueBox cols='12 4' color='olive' icon='envelope' value={messageUser} text='Mensagens' />
                      
                    </Row>
   
                    </Content> 
                 <Content>
                 <Row>
                    <Grid cols='12 4'> 
                        <Select />  
                    </Grid> 
                   
                   </Row>
                   <Row>
                        <DataChart apiData ={ < BarChat />} cols='12 4'/>
                        <DataChart apiData ={ <PieChart />} cols='12 4'/>
                        <DataChart apiData ={ <LineChart />}  cols='12 4'/>
                   </Row>
                   
              
                </Content> 
                
                <Content>
                    
                </Content>  
             
            </div>
        )
    }
}

const mapStateToProps = state => ({summary: state.dashboard.summary, dashboardgoalslist  : state.dashboard.dashboardgoalslist, 
     goalsCount:state.dashboard.goalsCount,  allYears:state.dashboard.allYears   , billingCyclesUser: state.dashboard.billingCyclesUser,
     messageUser  : state.dashboard.messageUser })
const mapDispatchToProps = dispatch => bindActionCreators({getSummary,getBillingCyclesCount, getDashboardGoalsCount,getAllYears 
    ,getDashboardBarChat,getCountMessage}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)