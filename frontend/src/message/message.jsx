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
import { initMessage, create, update, remove,vier } from './messageActions'
import   '../message/message.css'

import List from './messageList'
import Form from './messageForm'

class Message extends Component {

    componentWillMount() {
        this.props.initMessage()
    }

    render() {
        return (
            <div> 
                <ContentHeader title='Mensagens' small='envelop' />
                <Content> 
                    <Tabs> 
                        <TabsHeader> 
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                            <TabHeader label='Visualizar' icon='eye' target='tabVier' />
                        </TabsHeader> 
                        <TabsContent> 
                            <TabContent id='tabList'>
                                <List />
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.create}
                                    submitLabel='Incluir' submitClass='primary' eye={true} />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.update}
                                    submitLabel='Alterar' submitClass='info' eye={true}  />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.remove} readOnly={true}
                                    submitLabel='Excluir' submitClass='danger' eye={true}  />
                            </TabContent>
                            <TabContent id='tabVier'>
                                <Form onSubmit={this.props.vier} eye={false} readOnly={true}
                                    submitLabel='Visualizar' submitClass='info' />
                            </TabContent>
                        </TabsContent> 
                    </Tabs> 
                </Content> 
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({initMessage, create, update, remove,vier}, dispatch)
export default connect(null, mapDispatchToProps)(Message)