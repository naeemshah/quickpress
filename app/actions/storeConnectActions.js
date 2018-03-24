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
      endpoint: 'system_status',
      key: key,
      secret: secret,
      store_url: url,
    };

    axios
      .post(serverURL, JSON.stringify(requestData))
      .then(function(response) {
        if (response.status === 200 && response.data.status === 'success') {
          
          AsyncStorage.setItem(
            'StoreKeys',
            JSON.stringify({ storeUrl: url, key: key, secret: secret })
          );

          AsyncStorage.setItem(
            'StoreData2',
            JSON.stringify(response.data.data)
          );
          dispatch({
            type: 'SET_STORE_KEYS',
            payload: { storeUrl: url, key: key, secret: secret, auth: true,data2:response.data.data },
          });
        } else {
          alert('could not connect to store. please check info provided');
        }

        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
      })
      .catch(function(error) {
        alert('could not connect to store. please try agian'+error);
        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
      });
  };
}
