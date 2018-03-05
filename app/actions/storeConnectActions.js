import {Buffer} from "buffer";
import {serverURL} from ".././helper/helper"

export function Authentication(url, key, secret) {
  return function(dispatch) {
    dispatch({
      type: 'SET_CONNECT_BTN',
      payload: { dis: true, text: 'Connecting....' },
    });

    let requestData : {endpoint:"system_status",key:key,secret:secret,store_url:url};
    
    fetch(serverURL, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
             },
     body: JSON.stringify(requestData)
    })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {

        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
        alert(JSON.stringify(responseJson));
      })
      .catch(function(e) {
        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
        alert(e);
        
      });
  };
}
