import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AppContext from '../AppContext';

const MapContainer = () => {
  const [ currentPosition, setCurrentPosition ] = useState({});
  const [ currentBounds, setCurrentBounds ] = useState(0);
  const [ state, dispatch ] = useContext(AppContext);

  const closeBreweries = state.breweries.map(b => {

  })
  
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };
  
  const mapStyles = {        
    height: "60vh",
    width: "100%"};
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })

  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyClqjDMJq60R-caqxkXXXX-W0tqN5kve_E'>
        <GoogleMap
          // onLoad={async m => {
          //   const map = await m;
          //   const bounds = await map.getBounds();
          //   console.log(bounds)
          // }}
          mapContainerStyle={mapStyles}
          zoom={12}
          center={currentPosition}
        />
     </LoadScript>
  )
}

export default MapContainer;