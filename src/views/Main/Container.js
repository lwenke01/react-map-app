import React from 'react'

//map
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
//components
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
//style
import styles from './styles.module.css'

// export class Container extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//
//     this.state = {
//       places: [],
//       pagination: null
//     }
//   }
//   onReady(mapProps, map){
//     searchNearby(
//       this.props.google,
//       map,
//       {
//         location: map.center,
//         radius: '500',
//         types: ['cafe']
//
//       }
//     ).then((results, pagination) => {
//       this.setState({
//         places: results,
//         pagination
//       })
//     }).catch((status) => {
//       console.log('error fetching data');
//       })
//
//   }
//
//   onMapMove() {}
//
//   onMarkerClick(item) {
//     const {push} = this.context.router;
//     const {place} = item;
//     push(`/map/detail/${place.place_id}`)
//   }
//   render() {
//     let children = null;
//     if (this.props.children) {
//       children = React.cloneElement(this.props.children, {
//         google: this.props.google,
//         places: this.state.places,
//         loaded: this.props.loaded,
//         router: this.context.router,
//         onMove: this.onMapMove.bind(this),
//         onMarkerClick: this.onMarkerClick.bind(this),
//         zoom: this.props.zoom
//       })
//     }
//     return (
//       <Map
//           google={this.props.google}
//           onReady={this.onReady.bind(this)}
//           visible={false}
//           className={styles.wrapper}>
//           <Header />
//
//           <Sidebar
//             title={'Restaurants'}
//             onListItemClick={this.onMarkerClick.bind(this)}
//             places={this.state.places} />
//
//           <div className={styles.content}>
//             {this.state.places.map(place => {
//             return (<div key={place.id}>{place.name}</div>)
//           })}
//           </div>
//
//           </Map>
      // </div>
//     )
//   }
// }

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null
    }
  }
  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe']
    }
    searchNearby(google, map, opts)
      .then((results, pagination) => {
        this.setState({
          places: results,
          pagination
        })
      }).catch((status, result) => {
        // There was an error
      })
  }
  render() {
     return (
       <div>
         Hello from the container
         <Map
           google={this.props.google}
           onReady={this.onReady.bind(this)}
           visible={false}
           className={styles.wrapper}>
           <Header />
           <Sidebar
              title={'Restaurants'}
              places={this.state.places}/>
              <div className={styles.content}>
              {this.state.places.map(place => {
                return (<div key={place.id}>{place.name}</div>)
              })}
              </div>



         </Map>
       </div>
     )
   }
 }

// Container.contextTypes = {
//   router: T.object
// }
export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container)
