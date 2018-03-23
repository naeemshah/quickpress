import axios from 'axios';
export const serverURL = 'http://34.216.246.14/api/';


export function wooCommerceEndpoint(requestData, callback,errorCallBack) {
    axios
      .post(serverURL, JSON.stringify(requestData))
      .then(function(response) {
        // alert(response.data);
        callback(response);
      })
      .catch(function(error) {
          errorCallBack(error)
      //  alert('Error while featching products. Error: ' + error);
      });
  }
