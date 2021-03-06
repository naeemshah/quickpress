import { AppRegistry } from 'react-native';
import App from './App';
//require('react-devtools');

// import { connectToDevTools } from 'react-devtools-core'

// connectToDevTools({
//   host: '192.168.10.100',
//   resolveRNStyle: require('flattenStyle'),
// })



// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

  // fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
  return global._fetch(uri, options, ...args).then((response) => {
    console.log('Fetch', { request: { uri, options, ...args }, response });
    return response;
  });
};


AppRegistry.registerComponent('app', () => App);


