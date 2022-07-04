import React, { useEffect, useState, useReducer } from 'react';
import AppContext from '../AppContext';
import BreweriesList from '../BreweriesList/BreweriesList';
import MapContainer from '../Map/MapContainer';
import './App.scss';
import hop from '../assets/favicon.ico';
import reducer from '../utils/reducer';

const initialState = {
  breweries: [],
  currentPage: 1,
  closeBreweries: [],
  currentMode: 'All'
}

// modes are 'All' and 'Local'


// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_BREWERIES':
//       return {...state, breweries: action.breweryList };
//     case 'SET_CURRENT_PAGE':
//       return {...state, currentPage: action.currentPage };
//     case 'SET_CLOSE_BREWERIES':
//       return {...state, closeBreweries: action.closeBreweries };
//     case 'TOGGLE_MODE':
//       return {...state, currentMode: action.mode };
//     default:
//       return state;
//   } 
// }

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

  const toggleCurrentMode = () => {
    const mode = state.currentMode === 'All' ? 'Local' : 'All';
    dispatch({ type: 'TOGGLE_MODE', mode })
  }

  useEffect(() => {
    getBreweries();
  }, [state.currentPage])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div>
        <div id="fixed-section">
          <header>
            <img src={hop}/>
            <h1>BeerHop</h1>
          </header>
          <MapContainer />
        </div>
        <div id="scroll-section">
          <main>
            <div id="toggleBox">
              <div id="toggleBtn">
                <span>{state.currentMode}</span>
                <input type="checkbox" id="switch" onClick={toggleCurrentMode}/><label htmlFor="switch">Toggle</label>
              </div>
              <div id="page-btns">
                <button onClick={() => {
                  if (state.currentPage > 1) {
                    dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage - 1 })
                  }
                }}> Back </button>
                <h4>{state.currentPage}</h4>
                <button onClick={() => {
                    dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage + 1 })
                }}> Forward </button>
              </div>
            </div>
            <BreweriesList />
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
