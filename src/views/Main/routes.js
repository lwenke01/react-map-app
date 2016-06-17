import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Container from './Container'

// import Map from

export const makeMainRoutes = () => {
  return (
    <Route path="/" component={Container} />
  )
}

export default makeMainRoutes;
