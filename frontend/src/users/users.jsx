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
import { initUsers, createUsers, updateUsers, removeUsers ,getUsersCount} from './usersActions'
import List from './usersList'
import Form from './usersForm'



class Users extends Component {
    componentWillMount() {
        this.props.initUsers(),
        this.props.getUsersCount()

    }


    render() {

        const  {userCount} = this.props.userCount
        console.log(userCount)
        return (
            <div> 
                <ContentHeader title='Usuários' small='Cadastro' />
                <Content> 
                    <Tabs> 
                        <TabsHeader> 
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                            {/* <TabHeader label='Incluir' icon='plus' target='tabCreate' /> */}
                            <TabHeader label='Alterar' icon='pencil' target='tabUpdate' />
                            <TabHeader label='Excluir' icon='trash-o' target='tabDelete' />
                        </TabsHeader> 
                        <TabsContent> 
                            <TabContent id='tabList'>
                            <Row> 
                                <ValueBox cols='12 4' color='aqua' icon='users'
                                    value={userCount} text='Users' />
                           </Row> 
                             <List  />
                            </TabContent>
                            {/* <TabContent id='tabCreate'>
                                <Form onSubmit={this.props.createUsers}
                                    submitLabel='Incluir' submitClass='primary' />
                            </TabContent> */}
                            <TabContent id='tabUpdate'>
                                <Form onSubmit={this.props.updateUsers}
                                    submitLabel='Alterar' submitClass='info' />
                            </TabContent>
                            <TabContent id='tabDelete'>
                                <Form onSubmit={this.props.removeUsers} readOnly={true}
                                    submitLabel='Excluir' submitClass='danger' />
                            </TabContent>
                        </TabsContent> 
                    </Tabs> 
                </Content> 
            </div> 
        )
    }
}
const mapStateToProps = state => ({userCount: state.users.userCount  })

const mapDispatchToProps = dispatch => bindActionCreators({ initUsers, createUsers, updateUsers, removeUsers ,getUsersCount }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Users)