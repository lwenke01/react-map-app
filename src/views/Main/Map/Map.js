import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import {GoogleApiWrapper} from 'GoogleMapsReactComponent'
import Map, { Marker } from 'google-maps-react'

import styles from './styles.module.css'

const eventNames : ['click', 'ready', 'mouseover'];

export class MapComponent extends React.Component {

  //get markers
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

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, c => {
        return React.cloneElement(c, this.props, {
          map: this.props.map,
          google: this.props.google
        })
      })
    } else {
      return this._renderMarkers();
    }
  }

  //render infowindow
  google.maps.event.addListener(marker, 'click', function(){
    infowindow.setContent(this._renderInfoWindow(place));
    infowindow.open(map, this);
  });

  _renderInfoWindow: function (place){
    return(
      <Info
      onClick={this.props.onMarkerClick.bind(this)}>
      {place.name}
       <button className="btn btn-danger btn-block" onClick={this.props.addList.bind(this, place)}>I want to go here !! </button>
      </div>
    )
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
  // MapComponent.propTypes = {
  //   google: React.PropTypes.object,
  //   zoom: React.PropTypes.number,
  //   initialCenter: React.PropTypes.object,
  //   centerAroundCurrentLocation: React.PropTypes.bool
  // }
  // MapComponent.defaultProps = {
  //   zoom: 13,
  //   initialCenter: {
  //     lat: 47.6062,
  //     lng: -122.3321
  //   },
  //   centerAroundCurrentLocation: false
  // }
}

export default MapComponent
