import React from 'react'
import If from '../operator/if'


export default props => (
  <If test={!props.hide}>
    <button className={'btn btn-'+ props.style} value={props.value}
     onClick={props.onClick}>
      <i className={'fa fa-'+ props.icon}></i>
    </button>
  </If>
)