import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import Map, { GoogleApiWrapper, Marker } from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {
  //get markers
  renderMarkers(){
    return this.props.places.map(p => {
      return <Marker key={p.id}
                    name={p.id}
                    place={p}
                    onClick={this.props.onMarkerClick.bind(this)}
                    position={p.geometry.location}
                    />
    })

  }
  //get map
  render() {
    return (
      <Map google={this.props.google}
          className={styles.map} >
        {this.renderMarkers()}
      </Map>
    )
  }
}

export default MapComponent
