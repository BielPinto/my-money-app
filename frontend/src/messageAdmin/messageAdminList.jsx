import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getListMessageAdmin, showUpdate, showDelete,showVier } from './messageAdminActions'
import If from '../common/operator/if'
import   '../messageAdmin/messageAdmin.css'


class MessageAdminList extends Component {

    componentWillMount() {
        this.props.getListMessageAdmin()
       // console.log(this.props)
    }
  

    renderRows() {
        const listMessageAdmin = this.props.listMessageAdmin || []
       
        
        return listMessageAdmin.map(bc => (
            <tr key={bc._id}>
                <td>{bc.titulo}</td>
                <td className=''>{bc.name}</td>
                <td>{bc.dateMessage}</td>
                <td className='showMe'>{bc.comments}</td>
                <td className='showMe'>{bc.userSend}</td>
                <td>{bc.nomeAdmin}</td>
                <td>{bc.respAdmin}</td>
                <td>{bc.dateResp}</td>
                <td className='showMe'>{bc.matriAdmin}</td>
                <td className='showMe'>{bc.matricula}</td>
                <td className='showMe'>{bc.adminSend}</td>
                <td>
                <If test={bc.adminSend != 'SIM'}>  
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-comment-o'></i>
                    </button>
                </If>
                    <button className='btn btn-info' onClick={() => this.props.showVier(bc)}>
                        <i className='fa fa-eye'></i>
                    </button>
                    {/* <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button> */}
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <div>
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Usuario</th>
                            <th>Aberto em :</th>
                            <th className='showMe'>Mensagem</th>
                            <th>Administrador</th>
                            <th>Resposta</th>
                            <th>Data de Resp.</th>
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

const mapStateToProps = state => ({listMessageAdmin: state.messageAdmin.listMessageAdmin})
const mapDispatchToProps = dispatch => bindActionCreators({getListMessageAdmin, showUpdate, showDelete,showVier}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MessageAdminList)

