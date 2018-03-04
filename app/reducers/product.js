export default (product = (
  state = {
    products: [],
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case 'GET_PRODUCT':
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.loading = false;
      stateN.products = action.payload.products;
      return stateN;
    case 'LOADING_PRODUCT':
      let stateN2 = JSON.parse(JSON.stringify(state));
      stateN2.loading = true;
      return stateN2;
    default:
      return state;
  }
});
