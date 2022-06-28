import React, { useContext } from 'react';
import AppContext from '../AppContext';
import Card from '../Card/Card';
import './BreweriesList.scss';

const BreweriesList = () => {
  const [state, dispatch] = useContext(AppContext);

  const breweryCards = state.breweries.map((b, index) => {
    return (
      <Card 
        brewery={b}
        key={index}
      />
    )
  })

  return (
    <div className="breweries-list">
      {breweryCards}
    </div>
  )
}

export default BreweriesList;