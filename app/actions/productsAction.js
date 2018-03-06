import axios from 'axios';
import { serverURL } from '.././helper/helper';

export function getProducts(url, key, secret) {
  return dispatch => {
    // fetch('http://192.168.10.100/wooAPI/')
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     dispatch({
    //       type: 'LOADING_PRODUCT',
    //       payload: {},
    //     });
    //     dispatch({
    //       type: 'GET_PRODUCT',
    //       payload: { products: responseJson },
    //     });
    //   });

    // dispatch({
    //   type: 'LOADING_PRODUCT',
    //   payload: {},
    // });

    let requestData = {
      endpoint: 'products',
      key: key,
      secret: secret,
      store_url: url,
    };
    axios
      .post(serverURL, JSON.stringify(requestData))
      .then(function(response) {
        // alert(response.data);

        dispatch({
          type: 'GET_PRODUCT',
          payload: { products: response.data },
        });
      })
      .catch(function(error) {});
  };
}
