export default (product = (
  state = {
    products: [],
    loading: false,
    currentProduct: {},
    refreshing:false
  },
  action
) => {
  switch (action.type) {
    case 'GET_PRODUCT': {
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.loading = false;
      stateN.refreshing = false;
      stateN.products = action.payload.products;
      return { ...stateN };
    }
    case 'LOADING_PRODUCT': {
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.loading = true;
      return { ...stateN };
    }
    case 'Refreshing_PRODUCT': {
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.refreshing = true;
      return { ...stateN };
    }
    case 'SET_CURRENT_PROD': {
      let stateN = JSON.parse(JSON.stringify(state));
      let currentProduct = {};
      stateN.products.map((e, i) => {
        if (e.id === action.payload.id) {
          currentProduct = e;
        }
      });
      return { ...stateN, currentProduct: currentProduct };
    }

    case 'SET_PRODUCT_IMAGE': {
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.currentProduct.images[action.payload.index].src =
        action.payload.src;
      return { ...stateN };
    }

    default:
      return state;
  }
});
