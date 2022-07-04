const getBreweries = async ( state, dispatch, error, setError  ) => {
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

export { getBreweries };