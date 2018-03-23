import axios from 'axios';
import { serverURL } from '.././helper/helper';

export function getProducts(url, key, secret) {
  return (dispatch, getState) => {
    const { currentProductPage, productPerPage } = getState().product;

    dispatch({
      type: 'LOADING_PRODUCT',
      payload: {},
    });

    let requestData = {
      endpoint: 'products',
      key: key,
      secret: secret,
      store_url: url,
      args: { per_page: productPerPage, page: currentProductPage },
    };

    fetchProducts(requestData, function(response) {
      if (response.status === 200 && response.data.status === 'success') {
        console.log(response);
        dispatch({
          type: 'GET_PRODUCT',
          payload: { products: response.data.data },
        });
      } else {
        alert('Error while featching products');
      }
    });
  };
}

function fetchProducts(requestData, callback) {
  axios
    .post(serverURL, JSON.stringify(requestData))
    .then(function(response) {
      // alert(response.data);

      callback(response);
    })
    .catch(function(error) {
      alert('Error while featching products. Error: ' + error);
    });
}
