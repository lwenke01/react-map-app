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

  //filter results
  // const _renderRestaurant = function(place) {
  //   console.log('PLACE ',place);
  //   return place.types[0] === 'restaurant'
  //
  // }


  onReady(mapProps, map){
    // const {place} = this.props
    // const restaurant = place.types.filter(_renderRestaurant)
    // console.log('mapProp ', mapProps);
    //   console.log('map',map);
    //   console.log('mapLoc',location);
    //   console.log('types ', this.props.place.place);
      // console.log('place ', mapProps.types[0]);


    searchNearby(
      // var restaurantOne = function(first) {
      //   console.log(mapProp[0]);
      // }

      // console.log('google props ',this.props.google)
      this.props.google,

      map,
      {
        location: map.center,
        radius: '500',
        types: ['restaurant']

      }
    ).then((results, pagination) => {
      this.setState({
        places: results,
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

//  Map.defaultProps = {
//   zoom: 14,
//   initialCenter: {
//     lat: 47.774929,
//     lng: -122.419416
//   },
//   center: {},
//   centerAroundCurrentLocation: false,
//   style: {},
//   containerStyle: {},
//   visible: true
// }

Container.contextTypes = {
  router: React.PropTypes.object
}
export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
