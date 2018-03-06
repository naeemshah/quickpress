import { Buffer } from 'buffer';
import { serverURL } from '.././helper/helper';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

export function Authentication(url, key, secret) {
  return function(dispatch) {
    dispatch({
      type: 'SET_CONNECT_BTN',
      payload: { dis: true, text: 'Connecting....' },
    });

    let requestData = {
      endpoint: 'products',
      key: key,
      secret: secret,
      store_url: url,
    };
    axios
      .post(serverURL, JSON.stringify(requestData))
      .then(function(response) {
        AsyncStorage.setItem(
          'StoreKeys',
          JSON.stringify({ storeUrl: url, key: key, secret: secret })
        );
        dispatch({
          type: 'SET_STORE_KEYS',
          payload: { storeUrl: url, key: key, secret: secret },
        });

        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
      })
      .catch(function(error) {
        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
      });
  };
}
