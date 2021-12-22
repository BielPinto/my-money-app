import React, { Component } from 'react'
import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

export default ({valueGoal, depositedAll} ) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${valueGoal}`} text='Total Meta' />
                <ValueBox cols='12 4' color='red' icon='credit-card'value={`R$ ${valueGoal - depositedAll}`} text='Falta' />
                <ValueBox cols='12 4' color='blue' icon='money'value={`R$ ${depositedAll}`} text='Total depositado' />
            </Row>
        </fieldset>
    </Grid>
)