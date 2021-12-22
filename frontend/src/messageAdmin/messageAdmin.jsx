import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabHeader from '../common/tab/tabHeader'
import TabContent from '../common/tab/tabContent'
import Row from  '../common/layout/row'
import ValueBox from  '../common/widget/valueBox'
import { initMessageAdmin, getListMessageAdminAnswered,getListMessageAdminNotAnswered,create, update, remove,vier} from './messageAdminActions'

import List from './messageAdminList'
import Form from './messageAdminForm'

class MessageAdmin extends Component {

    componentWillMount() {
        this.props.initMessageAdmin(),
        this.props.getListMessageAdminAnswered(),
        this.props.getListMessageAdminNotAnswered()
    }

    render() {
        
        const  answered = this.props.answered
        const  notAnswered = this.props.notAnswered
        const  total = notAnswered+ answered
        console.log("answered  "+answered )
        console.log("notAnswered  "+notAnswered)
        return (
            <div> 
                <ContentHeader title='Mensagens' small='envelop' />
                <Content> 
                    <Tabs> 
                        <TabsHeader> 
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            {/* <TabHeader label='Incluir' icon='plus' target='tabCreate' /> */}
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            {/* <TabHeader label='Excluir' icon='trash-o' target='tabDelete' /> */}
                            <TabHeader label='Visualizar' icon='eye' target='tabVier' />
                        </TabsHeader> 
                        <TabsContent> 
                            <TabContent id='tabList'>
                            <Row> 
                                <ValueBox cols='12 4' color='green' icon='envelope-open'
                                    value={answered} text='Respondidas' />
                                <ValueBox cols='12 4' color='red' icon='envelope'
                                    value={notAnswered} text='Pendente' />
                                <ValueBox cols='12 4' color='blue' icon='envelope'
                                    value={total} text='Total' />
                           </Row> 
                                <List />
                            </TabContent>
                            {/* <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create}
                                    submitLabel='Incluir' submitClass='primary' />
                            </TabContent> */}
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.update}
                                    submitLabel='Alterar' submitClass='info'   eye={true}   />
                            </TabContent>
                            <TabContent id='tabVier'>
                                <Form onSubmit={this.props.vier} eye={false} readOnly={true}
                                    submitLabel='Visualizar' submitClass='info' />
                            </TabContent>
                            {/* <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.remove} readOnly={true}
                                    submitLabel='Excluir' submitClass='danger' />
                            </TabContent> */}
                        </TabsContent> 
                    </Tabs> 
                </Content> 
            </div> 
        )
    }
}
const mapStateToProps = state => ({answered: state.messageAdmin.answered, notAnswered: state.messageAdmin.notAnswered })

const mapDispatchToProps = dispatch => bindActionCreators({initMessageAdmin,getListMessageAdminAnswered,getListMessageAdminNotAnswered,
    create, update, remove,vier}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MessageAdmin)