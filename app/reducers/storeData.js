export default (storeData = (
  state = {
    barCode: null,
    loading: false,
    showBarCodeScanner: false,
  },
  action
) => {
  switch (action.type) {
    case 'SET_BARCODE':
      let stateN = JSON.parse(JSON.stringify(state));
      stateN.barCode = action.payload;
      return stateN;
    case 'BARCODE_STATUS':
      let stateN2 = JSON.parse(JSON.stringify(state));
      stateN2.showBarCodeScanner = action.payload;
      return stateN2;

    default:
      return state;
  }
});
