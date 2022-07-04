const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BREWERIES':
      return {...state, breweries: action.breweryList };
    case 'SET_CURRENT_PAGE':
      return {...state, currentPage: action.currentPage };
    case 'SET_CLOSE_BREWERIES':
      return {...state, closeBreweries: action.closeBreweries };
    case 'TOGGLE_MODE':
      return {...state, currentMode: action.mode };
    default:
      return state;
  } 
}

export default reducer;