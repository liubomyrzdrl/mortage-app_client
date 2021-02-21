import React from 'react'
 import { Switch, Route} from 'react-router-dom'
import MortageCalculator from '../pages/MortageCalculator'
import Main from '../pages/Main'
 

const MainRoute: React.FC<{}>  = () => {
    return (
        <Switch>
            <Route exact path="/">
                < Main /> 
            </Route> 
            <Route path="/calculator">
                <MortageCalculator />
            </Route> 
        </Switch>
    )
}

export default MainRoute
