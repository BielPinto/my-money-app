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
import { initGoals, createGoals, updateGoals, removeGoals } from './goalsActions'
import List from './goalsList'
import Form from './goalsForm'


class Goals extends Component {
    componentWillMount() {
        this.props.initGoals()
    }


    render() {
        return (
            <div> 
                <ContentHeader title='Metas' small='Cadastro' />
                <Content> 
                    <Tabs> 
                        <TabsHeader> 
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            <TabHeader label='Incluir' icon='plus' target='tabCreate' />
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader> 
                        <TabsContent> 
                            <TabContent id='tabList'>
                             <List />
                            </TabContent>
                            <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.createGoals}
                                    submitLabel='Incluir' submitClass='primary' />
                            </TabContent>
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.updateGoals}
                                    submitLabel='Alterar' submitClass='info' />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.removeGoals} readOnly={true}
                                    submitLabel='Excluir' submitClass='danger' />
                            </TabContent>
                        </TabsContent> 
                    </Tabs> 
                </Content> 
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ initGoals, createGoals, updateGoals, removeGoals }, dispatch)
export default connect(null, mapDispatchToProps)(Goals)