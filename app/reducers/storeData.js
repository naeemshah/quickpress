export default (storeData = function(
  state = {
    barCode: false,
    loading: false,
    showBarCodeScanner: false,
    storeUrl: '',
    APIKey: '',
    APISecret: '',
    connectBtn: false,
    connectBtnText: 'Connect To Store',
    StorageKey: '@quickpress',
    authenticated: false,
  },
  action
) {
  switch (action.type) {
    case 'SET_BARCODE': {
      let stateN = JSON.parse(JSON.stringify(state));
      return { ...stateN, barCode: action.payload, showBarCodeScanner: false };
    }
    case 'BARCODE_STATUS': {
      let stateN = JSON.parse(JSON.stringify(state));
      return { ...stateN, showBarCodeScanner: action.payload };
    }
    case 'SET_STORE_URL': {
      return { ...state, storeUrl: action.payload };
    }

    case 'SET_STORE_KEYS': {
      return {
        ...state,
        storeUrl: action.payload.storeUrl,
        APIKey: action.payload.key,
        APISecret: action.payload.secret,
        authenticated: true,
      };
    }

    case 'SET_CONNECT_BTN': {
      return {
        ...state,
        connectBtn: action.payload.dis,
        connectBtnText: action.payload.text,
      };
    }

    default: {
      return { ...state };
    }
  }
});
