import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AppContext from '../AppContext';

const MapContainer = () => {
  const [ currentPosition, setCurrentPosition ] = useState(null);
  const [ state, dispatch ] = useContext(AppContext);
  const apiKey = process.env.REACT_APP_API_KEY;


  // I would like to implement this eventually, but having trouble making it work and also dynamically pulling the map bounds
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  useEffect(() => {
    getCloseBreweries(bounds);
  }, [state.breweries])


// eventually this will be dynamic
  const bounds = {
    w: -105.251503,
    e: -104.960008,
    n: 40.206281,
    s: 40.116241
  }

  const getCloseBreweries = bounds => {
    const closeBreweries = state.breweries.filter(b => {
      let bLng = parseFloat(b.longitude);
      let bLat = parseFloat(b.latitude);
      return (bounds.w < bLng && bLng < bounds.e && bounds.s < bLat && bLat < bounds.n);
    })
  
    dispatch({ type: 'SET_CLOSE_BREWERIES', closeBreweries })
  }
  
  const success = position => {
    const current = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(current);
  }
  
  const mapStyles = {        
    height: "60vh",
    width: "100%"
  };

  if (state.currentMode === 'All') {
    return (
      <LoadScript
        googleMapsApiKey={apiKey}>
         <GoogleMap
           mapContainerStyle={mapStyles}
           zoom={7}
           center={{ lat: 39.413014, lng: -105.358887 }}>
           {
             currentPosition &&
             (
               <Marker
                 icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                 position={currentPosition}
               />
             )
           }
           {
             state.breweries && (
               state.breweries.map(b => {
                 return <Marker key={b.name} position={{ lat: parseFloat(b.latitude), lng: parseFloat(b.longitude) }} />
               })
             )
           }
         </GoogleMap>
      </LoadScript>
   )
  } else {
    return (
      <LoadScript
        googleMapsApiKey={apiKey}>
         <GoogleMap
           mapContainerStyle={mapStyles}
           zoom={12}
           center={currentPosition}>
           {
             currentPosition &&
             (
               <Marker
                 icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                 position={currentPosition}
               />
             )
           }
           {
             state.closeBreweries && (
               state.closeBreweries.map(b => {
                 return <Marker key={b.name} position={{ lat: parseFloat(b.latitude), lng: parseFloat(b.longitude) }} />
               })
             )
           }
         </GoogleMap>
      </LoadScript>
    )
  }
}

export default MapContainer;