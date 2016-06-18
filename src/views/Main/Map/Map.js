import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import Map, { GoogleApiWrapper, Marker } from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {

  // get markers
  _renderMarkers(){
    if (!this.props.places) {
      return;
    }
    return this.props.places.map(p => {
      return <Marker
                key={p.id}
                name={p.id}
                place={p}
                label={p.name}
                onClick={this.props.onMarkerClick.bind(this)}
                map={this.props.map}
                position={p.geometry.location}/>
    });

  }
  _renderChildren(){
    const {children} = this.props;
      if(!children) return;

    // if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, {
          map: this.map,
          google: this.props.google
          // mapCenter: this.state.centerAroundCurrentLocation
        });
      })

    //
  }
  //get map
  render() {
    const {children} = this.props;

    return (

      <Map
          map={this.props.map}
          google={this.props.google}
          className={styles.map}
          zoom={this.props.zoom}
          onRecenter={this.props.onMove}
          onDragend={this.props.onMove}
          onClick={this.props.onClick}
          visible={!children || React.Children.count(children) ==0}
           >
        {this._renderChildren()}
      </Map>
    )
  }
}
Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  centerAroundCurrentLocation: React.PropTypes.bool
}
Map.defaultProps = {
  zoom: 10,
  initialCenter: {
    lat: 47.6062,
    lng: -122.419416
  },
  centerAroundCurrentLocation: true
}
export default MapComponent
