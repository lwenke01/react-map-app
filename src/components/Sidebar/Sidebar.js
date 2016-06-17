import React, { PropTypes as T } from 'react'
// import classnames from 'classnames'

import Listing from 'components/Listing/Listing'

import styles from './styles.module.css'



export class Sidebar extends React.Component {
  // onClick(place, map, google) {
  //
  // }
  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.heading}>
          <h1>{this.props.title}</h1>
          </div>
        </div>
    )
  }
}


export default Sidebar
