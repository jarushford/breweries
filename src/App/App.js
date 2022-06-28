import React, { useEffect, useState, useReducer } from 'react';
import AppContext from '../AppContext';
import BreweriesList from '../BreweriesList/BreweriesList';
import MapContainer from '../Map/MapContainer';
import './App.scss';
import hop from '../assets/favicon.ico';

const initialState = {
  breweries: [],
  currentPage: 1,
  closeBreweries: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BREWERIES':
      return {...state, breweries: action.breweryList };
    case 'SET_CURRENT_PAGE':
      return {...state, currentPage: action.currentPage };
    case 'SET_CLOSE_BREWERIES':
      return {...state, closeBreweries: action.closeBreweries };
    default:
      return state;
  } 
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError ] = useState('');

  const getBreweries = async () => {
    const url = `https://api.openbrewerydb.org/breweries?by_state=colorado&per_page=25&page=${state.currentPage}`
    setError('');

    try {
      const response = await fetch(url);
      const breweryList = await response.json();
      if (breweryList.length === 0) {
        dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage - 1 })
      } else {
        dispatch({ type: 'SET_BREWERIES', breweryList })
      }
    } catch(error) {
      setError(error.message);
      // display this somewhere else eventually
    }
  }

  useEffect(() => {
    getBreweries();

  }, [state.currentPage])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div>
        <header>
          <img src={hop}/>
          <h1>BeerHop</h1>
        </header>
        <MapContainer />
        <main>
          <BreweriesList />
        </main>
        <footer>
          <button onClick={() => {
            if (state.currentPage > 1) {
              dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage - 1 })
            }
          }}> Back </button>
          <h4>{state.currentPage}</h4>
          <button onClick={() => {
              dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage + 1 })
          }}> Forward </button>
        </footer>
      </div>
    </AppContext.Provider>
  );
}

export default App;
