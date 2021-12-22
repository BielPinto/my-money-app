import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getUserOnlyList, updateUserOnly,showUpdateUserOnly, showDeleteUserOnly} from './userOnlyActions'
import If from '../common/operator/if'
import Grid from '../common/layout/grid'
import IconButton from '../common/template/iconButton'

class UserOnlyList extends Component {


    componentWillMount() {
        this.props.getUserOnlyList()
     
    }
  

    renderRows() {
        const userOnlylist = this.props.userOnlylist || []

        return <tr key={userOnlylist._id}>
                <td>{userOnlylist.name}</td>
                <td>{userOnlylist.email}</td>
                <td>{userOnlylist.adm}</td>
                
                <td>
                    <button className='btn btn-warning' onClick={() => this.props.showUpdateUserOnly(userOnlylist)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                    {/* <button className='btn btn-danger' onClick={() => this.props.showDeleteUserOnly(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button> */}
                </td>
               
            </tr>
    }

    render() {
        
        return (

            <div>
            
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

const mapStateToProps = state => ({userOnlylist: state.userOnly.userOnlylist})
const mapDispatchToProps = dispatch => bindActionCreators({getUserOnlyList,updateUserOnly, showUpdateUserOnly,showDeleteUserOnly}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UserOnlyList)

