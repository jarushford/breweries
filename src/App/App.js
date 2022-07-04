import React, { useEffect, useState, useReducer } from 'react';
import AppContext from '../AppContext';
import BreweriesList from '../BreweriesList/BreweriesList';
import MapContainer from '../Map/MapContainer';
import './App.scss';
import hop from '../assets/favicon.ico';
import reducer from '../utils/reducer';
import initialState from '../utils/state';
import { getBreweries } from '../utils/fetch';
import toggle from '../utils/toggle';


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
    getBreweries( state, dispatch, error, setError );
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
              {toggle( state.currentMode, toggleCurrentMode, "switch", "toggleBtn" )}
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
