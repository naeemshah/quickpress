export function getProducts() {
  return dispatch => {
    fetch('http://192.168.10.100/wooAPI/')
      .then(response => response.json())
      .then(responseJson => {
        dispatch({
          type: 'LOADING_PRODUCT',
          payload: {},
        });
        dispatch({
          type: 'GET_PRODUCT',
          payload: { products: responseJson },
        });
      });
  };
}
