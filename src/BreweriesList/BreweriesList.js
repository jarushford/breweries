// GENERAL IMPORTS

import React, { useContext } from 'react';
import AppContext from '../AppContext';

// COMPONENTS

import Card from '../Card/Card';

// STYLES

import './BreweriesList.scss';


const BreweriesList = () => {
  const [state, dispatch] = useContext(AppContext);

  const getBreweryCards = () => {
    if (state.currentMode === 'All') {
      return state.breweries.map((b, index) => {
        return (
          <Card 
            brewery={b}
            key={index}
          />
        )
      })
    } else {
      return state.closeBreweries.map((b, index) => {
        return (
          <Card
            brewery={b}
            key={index}
          />
        )
      })
    }
  }

  return (
    <div className="breweries-list">
      {getBreweryCards()}
    </div>
  )
}

export default BreweriesList;