import React, { PropTypes as T } from 'react'
import classnames from 'classnames'

import Rating from 'components/Rating/Rating'
import Price from 'components/Price/Price'
import styles from './styles.module.css'

export class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    }
  }

  onClick(e) {
    this.props.onClick(this.props.place);
  }
  render() {
    const {place} = this.props;
    return (
      <div
        onClick={this.onClick.bind(this)}
        className={classnames(styles.item, {
          [styles.itemHovered]: this.state.hovered
        })}>

          <h1 className={classnames(styles.title)}>{place.name}</h1>
          <Rating className={styles.rating}
                  percentage={(place.rating/6)} />
            <Price className={styles.price_level}
             percentage={(place.price_level)/11}/>

    


          </div>
    )
  }
}
Item.propTypes = {
  place: T.object.isRequired,
  onHighlight: T.func,
}

Item.defaultProps = {
  onHighlight: () => {},
  offHighlight: () => {}
}

export default Item
