import { serverURL, wooCommerceEndpoint } from '.././helper/helper';

export function getProducts(url, key, secret, first) {
  return (dispatch, getState) => {
    const { currentProductPage, productPerPage } = getState().product;
    const { APIKey, APISecret, storeUrl } = getState().storeData;
    dispatch({
      type: 'LOADING_PRODUCT',
      payload: {},
    });

    //currentProductPage = (first) ? 1 : currentProductPage;

    let requestData = {
      endpoint: 'products',
      key: APIKey,
      secret: APISecret,
      store_url: storeUrl,
      args: { per_page: productPerPage, page: currentProductPage },
    };

    wooCommerceEndpoint(
      requestData,
      function(response) {
        if (response.status === 200 && response.data.status === 'success') {
          console.log(response);
          dispatch({
            type: 'GET_PRODUCT',
            payload: { products: response.data.data },
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
