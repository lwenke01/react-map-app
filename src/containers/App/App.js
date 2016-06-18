import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import ReactDOM from 'react-dom';


class App extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  }
  static PropTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired
  }
  //class getter
  get content() {
    return (
      <Router
        routes={this.props.routes}
        history={this.props.history} />
    )
  }
  render() {
    return (
      <div style={{ height: '100%' }}>
      {this.content}
      </div>
    )
  }
}

module.exports = App;
