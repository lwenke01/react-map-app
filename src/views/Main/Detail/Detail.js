import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import {getDetails} from 'utils/googleApiHelpers'

import Rating from 'components/Rating/Rating'
import Price from 'components/Price/Price'

import styles from './styles.module.css'

export class Detail extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.object,
  }
  constructor(props, context) {
    super(props, context)

    this.state = {
      loading: true,
      place: {},
      location: {}
    }
  }
  //check if map loaded
  componentDidMount(){
    if (this.props.map) {
      this.getDetails(this.props.map)
    }
  }

  //check if props updated
  componentDidUpdate(prevProps) {
    if (this.props.map &&
      (prevProps.map !== this.props.map ||
        prevProps.params.placeId !== this.props.params.placeId)) {
      this.getDetails(this.props.map);
    }
  }
//get photos
renderPhotos(place) {
  if (!place.photos || place.photos.length == 0) return;

  const cfg = {maxWidth: 300, maxHeight: 300}
  return <div className={styles.photoStrip}>
    {place.photos.map(p => {
      const url = `${p.getUrl(cfg)}.png`
      return (<img key={url} src={url} />)
    })}
  </div>
}

  getDetails(map) {
    const {google, params} = this.props;
    const {placeId} = params;

    //set state
    this.setState({
      loading:true
    }, () => {
      getDetails(google, map, placeId)
      .then((place) => {
        const {location} = place.geometry;
        const loc = {
          lat: location.lat(),
          lng: location.lng()
        }
        this.setState({
          place, location: loc, loading: false
        })
      })
    });
  }

  render(){
    if(this.state.loading) {
      return (<div className={styles.wrapper}>
      Loading ...
      </div>)
    }
    const {place} = this.state;

    return (
    <div className={styles.wrapper}>

      <div className={styles.header}>


          <h2>{place.name}</h2>
          <h4>{place.formatted_address}</h4>
        <div className={styles.rateBar}>
          <Rating className={styles.ratingDet}
            percentage={(place.rating/6)} />

          </div>
          <Price className={styles.priceDet}
            percentage={(place.price_level/11)} />


        <div className={styles.bar}>

          <h4>{place.formatted_phone_number}</h4>
          <h2><a href={place.website}>Website</a></h2>
          <h2><a href={place.url}>Map</a></h2>
        </div>
      </div>



      <div className={styles.details}>
        {this.renderPhotos(place)}

        <ul>
        <strong>Hours of Operation:</strong>
        <li>{place.opening_hours.weekday_text[0]}</li>
        <li>{place.opening_hours.weekday_text[1]}</li>
        <li>{place.opening_hours.weekday_text[2]}</li>
        <li>{place.opening_hours.weekday_text[3]}</li>
        <li>{place.opening_hours.weekday_text[4]}</li>
        <li>{place.opening_hours.weekday_text[5]}</li>
        <li>{place.opening_hours.weekday_text[6]}</li>

        </ul>
      </div>
    </div>

    )
  }
}

export default Detail
