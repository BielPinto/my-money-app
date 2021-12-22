import React from 'react'

import Grid from '../common/layout/grid'

export default props => (
    <Grid cols={props.cols}> 
        <div cols={props.cols} > 
             {props.apiData}

        </div>
    
    </Grid>
)
