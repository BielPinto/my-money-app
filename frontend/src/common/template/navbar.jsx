import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'
import { showUpdateUserOnly} from '../../users/usersActions'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
    }
    changeOpen() {

        this.setState({ open: !this.state.open })
    }
    render() {
        const { name, email } = this.props.user.user
        
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li onMouseLeave={() => this.changeOpen()}
                        className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
                        <a href="javascript:;" onClick={() => this.changeOpen()}
                            aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            
                            <span className="hidden-xs">{name}</span>
                        </a>
                        <ul className="dropdown-menu">
                            <li className="user-header">
                                {/* <img src="" className="img-circle" alt="User Image" /> */}
                                <p>{name}<small>{email}</small></p>
                            </li>
                           
                            <li className="user-footer">
                          {/* <div className="pull-left">
                                    <a href="#" onClick={this.props.showUpdateUserOnly(this.props.user.user)}
                                        className="btn btn-default btn-flat">Perfil</a>
                                </div>  */}
                                <div className="pull-right">
                                    <a href="#" onClick={this.props.logout}
                                        className="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout,showUpdateUserOnly }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


