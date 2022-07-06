// GENERAL IMPORTS

import React, { useEffect, useState, useReducer } from 'react';
import AppContext from '../AppContext';

// COMPONENTS

import BreweriesList from '../BreweriesList/BreweriesList';
import MapContainer from '../Map/MapContainer';
import toggle from '../utils/toggle/toggle';
import Button from '../utils/Button/Button';

// UTILITIES

import reducer from '../utils/reducer';
import initialState from '../utils/state';
import { getBreweries, getAllBreweries } from '../utils/fetch';

// STYLES AND ASSETS

import './App.scss';
import variables from '../index.scss';
import hop from '../assets/favicon.ico';


function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError ] = useState('');

  // toggleCurrentMode interacts with the reducer utility to toggle state.currentMode b/tw 'All' and 'Local'

  const toggleCurrentMode = () => {
    const mode = state.currentMode === 'All' ? 'Local' : 'All';
    dispatch({ type: 'TOGGLE_MODE', mode })
  }

  // when state.currentPage is updated, getBreweries will be called again, passing the necessary references to state, dispatch, and setError

  useEffect(() => {
    // getBreweries( state, dispatch, error, setError );
    getAllBreweries(dispatch);
  }, [state.currentPage])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <div id="fixed-section">
        <header>
          <img src={hop}/>
          <h1>BeerHop</h1>
        </header>
        <MapContainer />
      </div>
      <main id="scroll-section">
        <div id="controlsBox">
          {toggle( 
            state.currentMode, 
            toggleCurrentMode, 
            "switch", 
            variables.globalGreen
          )}
          <div id="page-btns">
            <Button
              text='Back'
              action={() => {
                if (state.currentPage > 1) {
                  dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage - 1 })
                }
              }}
              borderColor={variables.globalGreen}
              textColor={variables.globalGreen}
            />
            <h4>{state.currentPage}</h4>
            <Button
              text='Forward' 
              action={() => { 
                dispatch({ type: 'SET_CURRENT_PAGE', currentPage: state.currentPage + 1 })
              }}
              borderColor={variables.globalGreen}
              textColor={variables.globalGreen}
            />
          </div>
        </div>
        <BreweriesList />
      </main>
    </AppContext.Provider>
  )
}

export default App;
