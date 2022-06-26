import React, { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [breweries, setBreweries] = useState([]);
  const [currentPage, setCurrentPage ] = useState(1);
  const [error, setError ] = useState('');

  const getBreweries = async () => {
    const url = `https://api.openbrewerydb.org/breweries?by_state=colorado&per_page=25&page=${currentPage}`
    setError('');

    try {
      const response = await fetch(url);
      const breweryList = await response.json();
      if (breweryList.length === 0) {
        setCurrentPage(currentPage - 1)
      } else {
        setBreweries(breweryList);
      }
    } catch(error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getBreweries();
  }, [currentPage])

  return (
    <div>
      <h1>Colorado Brewery List</h1>
      { error && error }
      {JSON.stringify(breweries)}
      <footer>
        <button onClick={() => {
          if (currentPage >1) {
            setCurrentPage(currentPage - 1)
          }
        }}> Back </button>
        <span>{currentPage}</span>
        <button onClick={() => {
            setCurrentPage(currentPage + 1)
        }}> Forward </button>
      </footer>
    </div>
  );
}

export default App;
