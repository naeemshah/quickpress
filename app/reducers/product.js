export default (product = (
  state = {
    products: [],
    loading: false,
    currentProduct: {},
    refreshing: false,
    currentProductPage: 1,
    productPerPage: 10,
    lastPageReached: false,
  },
  action
) => {
  switch (action.type) {
    case 'GET_PRODUCT': {
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.loading = false;
      stateN.refreshing = false;
      if(action.payload.refresh){
        stateN.products =  action.payload.products;
        stateN.currentProductPage = 1;
      }else{
      stateN.products.push.apply(stateN.products, action.payload.products);
      stateN.currentProductPage++;
      }
      stateN.lastPageReached =
        action.payload.products.length == 0 ? true : false;
      
      return { ...stateN };
    }
    case 'LOADING_PRODUCT': {
      let stateN = JSON.parse(JSON.stringify(state));
      if(action.payload.refresh){
        stateN.refreshing = true;
        stateN.currentProductPage = 1;
      }else{
        stateN.loading = true;
      }
     
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

    case 'CHANGING_STOCK': {
      let stateN = JSON.parse(JSON.stringify(state));
      let { id, stock } = action.payload;
      stateN.products.map((e, i) => {
        if (e.id === id) {
          stateN.products[i].changingStock = true;
        }
      });
      return { ...stateN };
    }

    case 'STOCK_CHANGED': {
      let stateN = JSON.parse(JSON.stringify(state));
      let { id, stock } = action.payload;
      stateN.products.map((e, i) => {
        if (e.id === id) {
          stateN.products[i].changingStock = false;
          stateN.products[i].in_stock = stock;
        }
      });
      return { ...stateN };
    }

    default:
      return state;
  }
});
