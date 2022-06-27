import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AppContext from '../AppContext';

const MapContainer = () => {
  const [ currentPosition, setCurrentPosition ] = useState({});
  const [ currentBounds, setCurrentBounds ] = useState(0);
  const [ state, dispatch ] = useContext(AppContext);

  const closeBreweries = state.breweries.map(b => {
    return <Marker position={currentPosition} />
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
          mapContainerStyle={mapStyles}
          zoom={12}
          center={currentPosition}>
          {
            currentPosition.lat &&
            (
              <Marker position={currentPosition} />
            )
          }
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;
