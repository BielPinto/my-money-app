import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getListMessage, showUpdate, showDelete ,showVier} from './messageActions'
import If from '../common/operator/if'
import   '../message/message.css'


class MessageList extends Component {

    componentWillMount() {
        this.props.getListMessage()
       // console.log(this.props)
    }
  

    renderRows() {
        const listMessage = this.props.listMessage || []
        return listMessage.map(bc => (
            <tr key={bc._id}>
                <td>{bc.titulo}</td>
                <td>{bc.dateMessage}</td>
                <td>{bc.userSend}</td>
                <td  className='showMe'>{bc.comments}</td>
                <td className='showMe'>{bc.name}</td>

                <td >{bc.adminSend}</td>
                <td>{bc.nomeAdmin}</td>
                <td>{bc.dateResp}</td>           
                <td  className='showMe'>{bc.respAdmin}</td>
                <td className='showMe'>{bc.matriAdmin}</td>
                <td className='showMe'>{bc.matricula}</td>
             
                <td>
                 <If test={bc.adminSend != 'SIM'}>  
                    <button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
                        <i className='fa fa-pencil'></i>
                    </button>
                   </If>
                    
                   <button className='btn btn-info' onClick={() => this.props.showVier(bc)}>
                        <i className='fa fa-eye'></i>
                    </button>

                    <button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}>
                        <i className='fa fa-trash-o'></i>
                    </button>
                    
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
                            <th>Aberto</th>
                            <th>Enviado</th>
                            <th>Respondido</th>
                            <th>Administrador</th>                            
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

const mapStateToProps = state => ({listMessage: state.message.listMessage})
const mapDispatchToProps = dispatch => bindActionCreators({getListMessage, showUpdate, showDelete,showVier}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)

