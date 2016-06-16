
import React from 'react'
import {browserHistory, Router, Route} from 'react-router'


const Home = React.createClass({
  render: function() {
    return (<div>Hello World</div>)
  }
})
const routes = (
  <Router>
    <Route path= "/" component={Home} />
    <Redirect from="*" to="/"
/>
  </Router>
)


export default makeRoutes
