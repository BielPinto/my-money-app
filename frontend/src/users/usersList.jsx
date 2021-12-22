import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUsersList, showUpdateUsers, showDeleteUsers,searchUsers,handleUsers } from './usersActions'
import If from '../common/operator/if'
import Grid from '../common/layout/grid'
import IconButton from '../common/template/iconButton'

class UsersList extends Component {


    componentWillMount() {
        this.props.getUsersList()
        return {
            searchDescripton: this.props.searchDescripton
        }
    }
  

    renderRows() {
        const userslist = this.props.userslist || []
        
        console.log("** dentro da lista users"+ userslist)
        return userslist.map(bc => (
             
            <tr key={bc._id}>
                <td>{bc.name}</td>
                <td>{bc.email}</td>
                <td>{bc.adm}</td>
                <If test={bc.adm == 'NAO' }>  
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdateUsers(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button className='btn btn-danger' onClick={() => this.props.showDeleteUsers(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
                </If>
            </tr>
        ))
    }

    render() {
        const {searchDescripton} = this.props 
        return (

          
            <div>
            <Grid cols='12 3 2'>
                <input id='searchUser' className='form-control'placeholder='Pesquisar' 
                onChange={this.props.handleUsers}></input>
                        
            </Grid>
            <Grid cols='12 3 2'>
                    <IconButton style='info' icon='search' onClick={() => this.props.searchUsers(searchDescripton)}  >

                        </IconButton> 
                </Grid>  
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>e-mail</th>
                            <th>Administrador</th>
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

const mapStateToProps = state => ({userslist: state.users.userslist,searchDescripton:state.users.searchDescripton})
const mapDispatchToProps = dispatch => bindActionCreators({getUsersList,showUpdateUsers, showDeleteUsers,searchUsers,handleUsers}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UsersList)

