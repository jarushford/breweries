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


//Not getting all of the pages, should be more like 450 results...


const getAllBreweries = async (dispatch) => {
  let page = 1;
  let url = `https://api.openbrewerydb.org/breweries?by_state=colorado&per_page=25&page=${page}`;

  let breweries;
  let breweryArray = [];

  do {
      const response = await fetch(page === 1 ? url : url + page);

      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }

      breweries = (await response.json());
      breweryArray.push(...breweries);
      ++page;

  } while (breweries.length > 0);

  dispatch({ type: 'SET_BREWERIES', breweryList: breweryArray })
}


export { getBreweries, getAllBreweries };