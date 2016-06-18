import React from 'react'
import {Link} from 'react-router'
import styles from './styles.module.css'

export class Header extends React.Component {
  render() {
    return (
      <div className={styles.topbar}>
        <Link to="/"><h1>FoodTopia</h1></Link>

        <Link to="/cafes"><h3>Cafes</h3></Link>
        <section>
            <Link to="/"><h4>Back to Map</h4></Link>
        </section>

      </div>
    )
  }
}

export default Header
