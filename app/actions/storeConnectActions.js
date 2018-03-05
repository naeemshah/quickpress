var base64 = require('base-64');
var utf8 = require('utf8');
export function Authentication(url, key, secret) {
  return function(dispatch) {
    var bytes = utf8.encode(key + ':' + secret);
    var encoded = base64.encode(bytes);
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + encoded);

    dispatch({
      type: 'SET_CONNECT_BTN',
      payload: { dis: true, text: 'Connecting....' },
    });
    fetch(url + '/wp-json/wc/v2/system_status', {
      method: 'GET',
      headers: headers,
      //credentials: 'user:passwd'
    })
      .then(response => {
        alert(response.status);
        return response.json();
      })
      .then(responseJson => {
        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
      })
      .catch(function() {
        dispatch({
          type: 'SET_CONNECT_BTN',
          payload: { dis: false, text: 'Connect To Store' },
        });
        alert('error');
        dispatch();
      });
  };
}
