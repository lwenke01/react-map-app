import React from 'react'

//map
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
//components
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
//style
import styles from './styles.module.css'

export class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      places: [],
      pagination: null
    }
  }
  onReady(mapProps, map){

    console.log("MAP is " + map.center);
    console.log("MAPprops is " + mapProps.google.maps.places.PlacesServiceStatus);
    searchNearby(
      // var seattle = new google.maps.LatLng(-33.8665433,151.1956316);
      this.props.google,
      map,
      {

        location: map.center,
        radius: '1000',
        types: ['restaurant']

      }
    ).then((results, pagination) => {
      console.log('Results ' + results);
      this.setState({
        places: results,
        // console.log('PLACES ' + places);
        pagination
      })
    }).catch((status) => {
      console.log('error fetching data');
      })

  }

  onMapMove() {}

  onMarkerClick(item) {
    const {place} = item;
    const {push} = this.context.router;
    push(`/map/detail/${place.place_id}`)
  }
  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          router: this.context.router,
          onMove: this.onMapMove.bind(this),
          onMarkerClick: this.onMarkerClick.bind(this),
          zoom: this.props.zoom
      })
    }
    return (
       <Map
           google={this.props.google}
           onReady={this.onReady.bind(this)}
           visible={false}
          className={styles.wrapper}>
          <Header />

          <Sidebar
            title={'Restaurants'}
            onListItemClick={this.onMarkerClick.bind(this)}
            places={this.state.places}
            />

          <div className={styles.content}>
          {children}

          </div>
        </Map>

     )
   }
 }

Container.contextTypes = {
  router: React.PropTypes.object
}
export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
