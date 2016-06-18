import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import Map, { GoogleApiWrapper, Marker } from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {
//   componentDidUpdate(prevProps, prevState) {
//      if (prevProps.google !== this.props.google) {
//        this.loadMap();
//      }
//    }
//    componentDidMount() {
//      this.loadMap();
//    }
//
//    loadMap() {
//      //check to see if google maps is available before load
//      if (this.props && this.props.google) {
//        const {google} = this.props;
//        const maps = google.maps;
//        //reference for the DOM
//        const mapRef = this.refs.map;
//        const node = ReactDOM.findDOMNode(mapRef);
//        //define defaultProps
//        let zoom = 14;
//        let lat = 47.6062;
//        let lng = -122.3321;
//        const center = new maps.LatLng(lat, lng);
//        const mapConfig = Object.assign({},{
//          center: center,
//          zoom: zoom
//        })
//        this.map = new maps.Map(node, mapConfig);
//      }
//     //
//    }
//
//    render() {
//      return (
//       <div ref='map'>
//         Loading map...
//       </div>
//     )
//    }
//  }
//  Map.propTypes = {
//   google: React.PropTypes.object,
//   zoom: React.PropTypes.number,
//   initialCenter: React.PropTypes.object
// }
// Map.defaultProps = {
//   zoom: 13,
//   // San Francisco, by default
//   initialCenter: {
//     lat: 37.774929,
//     lng: -122.419416
//   }
// }
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
  initialCenter: React.PropTypes.object
  // centerAroundCurrentLocation: React.PropTypes.bool
}
Map.defaultProps = {
  zoom: 10,
  initialCenter: {
    lat: 47.6062,
    lng: -122.419416
  }
  // centerAroundCurrentLocation: false
}
export default MapComponent
