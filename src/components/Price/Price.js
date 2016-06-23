import React, { Component, PropTypes as T } from 'react'

import cx from 'classnames'

import styles from './styles.module.css'

const PriceIcon = (props) => (<span>$</span>)

export class Price extends React.Component {
  render() {

    const {percentage} = this.props;
    const style = {
      width: `${(percentage || 0) * 100}%`
    }
    return (
      <div className={styles.sprite}>
        <div className={styles.top} style={style}>
            <PriceIcon />
            <PriceIcon />
            <PriceIcon />
            <PriceIcon />


        </div>

      </div>
    )
  }
}
export default Price
