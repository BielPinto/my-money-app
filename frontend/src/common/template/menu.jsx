import React, { Component } from 'react'
import { connect } from 'react-redux'
import MenuItem from './menuItem'
import MenuTree from './menuTree'
import If from '../operator/if'


class Menu extends Component {

    render() {
        const {adm, name } = this.props.user.user
        const show =  adm == 'SIM'? true: false
       
        return (

            <div>
                <ul className='sidebar-menu'>
                <MenuItem path='/' label='Dashboard' icon='dashboard'/>
                <MenuItem path='userOnly' label='Perfil' icon='user'/>
                <MenuItem path='billingCycles' label='Ciclos de Pagamentos' icon='usd' />
                <MenuItem path='goals'  label='Metas' icon='crosshairs'/>
                <MenuItem path='messageUser'  label='FeedBack' icon='envelope'/>

                <If test={show}>
                   
                 
                <MenuTree label='Gerência' icon='dashboard'> 
                    <MenuItem path='admin'  label='Usuarios' icon='users'/>
                    <MenuItem path='messageAdmin'  label='Mensagens Usuários' icon='users'/>
                
                
                </MenuTree>
                </If> 
                </ul>
             </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
export default connect(mapStateToProps)(Menu)