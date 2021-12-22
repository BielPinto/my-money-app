import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import Grid from '../common/layout/grid'
import Input from '../common/form/input'
import If from '../common/operator/if'

class ItemListGoals extends Component {

    add(index, item = {}) {
        if(!this.props.readOnly) {
            this.props.arrayInsert('goalsForm', this.props.field, index, item)
        }
    }

    remove(index) {
        if(!this.props.readOnly && this.props.goalslist.length > 1) {
            this.props.arrayRemove('goalsForm', this.props.field, index)
        }
    }

    renderRows() {
        const goalslist = this.props.goalslist || []
        console.log("*** "+goalslist)
        return goalslist.map((item, index) => (
            <tr key={index}>
                <td><Field name={`${this.props.field}[${index}].date`} type='date' component={Input}
                    placeholder='Informe o nome' readOnly={this.props.readOnly} /></td>
                <td><Field name={`${this.props.field}[${index}].value`} type='currency' component={Input}
                    placeholder='Informe o valor' readOnly={this.props.readOnly} /></td>
                    <td><Field name={`${this.props.field}[${index}].description`} type='text' component={Input}
                    placeholder='Informe o valor' readOnly={this.props.readOnly} /></td>
              
                <td>
                    <button type='button' className='btn btn-success'
                        onClick={() => this.add(index + 1)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button type='button' className='btn btn-warning'
                        onClick={() => this.add(index + 1, item)}>
                        <i className="fa fa-clone"></i>
                    </button>
                    <button type='button' className='btn btn-danger'
                        onClick={() => this.remove(index)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Valor</th>
                                <th>Descrição</th>
                                <th className='table-actions'>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ arrayInsert, arrayRemove }, dispatch)
export default connect(null, mapDispatchToProps)(ItemListGoals)