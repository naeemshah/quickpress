import { serverURL, wooCommerceEndpoint } from '.././helper/helper';

export function getProducts(url, key, secret, first) {
  return (dispatch, getState) => {
    
    dispatch({
      type: 'LOADING_PRODUCT',
      payload: {refresh : first},
    });

    const { currentProductPage, productPerPage } = getState().product;
    const { APIKey, APISecret, storeUrl } = getState().storeData;

   let currentProductPageT = (first) ? 1 : currentProductPage;

    let requestData = {
      endpoint: 'products',
      key: APIKey,
      secret: APISecret,
      store_url: storeUrl,
      args: { per_page: productPerPage, page: currentProductPageT },
    };

    wooCommerceEndpoint(
      requestData,
      function(response) {
        if (response.status === 200 && response.data.status === 'success') {
          console.log(response);
          dispatch({
            type: 'GET_PRODUCT',
            payload: { products: response.data.data,refresh : first },
          });
        } else {
          alert('Error while featching products');
        }
      },
      function() {
        alert('Error while featching products');
      }
    );
  };
}

export function changeStock(productID, status) {
  return (dispatch, getState) => {
    dispatch({
      type: 'CHANGING_STOCK',
      payload: { id: productID, stock: status },
    });

    const { APIKey, APISecret, storeUrl } = getState().storeData;

    let requestData = {
      endpoint: 'products/' + productID,
      key: APIKey,
      secret: APISecret,
      store_url: storeUrl,
      args: { in_stock: status },
    };

    wooCommerceEndpoint(
      requestData,
      function(response) {
        if (response.status === 200 && response.data.status === 'success') {
          console.log(response);
          dispatch({
            type: 'STOCK_CHANGED',
            payload: { id: productID, stock: status },
          });
        } else {
          alert('Error while featching products22');
        }
      },
      function() {
        alert('Error while featching products33');
      },
      true
    );
  };
}
