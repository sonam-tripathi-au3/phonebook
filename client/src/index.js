import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';
import Form from './components/Form/index';
// import MemberDetails from  './components/MemberDetails';
import NotFound from './components/NotFoundPage'
import {Route, Switch,BrowserRouter as Router, Redirect} from 'react-router-dom'

function Directory () {
    return(
        <div>
            <Router>
             <Switch>
             <Route exact path="/" component={() => (<Redirect to='/home' />)} />
             <Route path='/home' component={App} ></Route>
             <Route path='/register' component={Form} ></Route>
             <Route path="*" component={NotFound}></Route>
             </Switch>
            </Router>
        </div>
    )
}
ReactDOM.render(<Directory />, document.getElementById('root'));