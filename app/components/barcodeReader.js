import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Alert } from 'react-native';

import BarcodeScanner, {
  Exception,
  FocusMode,
  CameraFillMode,
  BarcodeType,
  pauseScanner,
  resumeScanner,
} from 'react-native-barcode-scanner-google';
import { connect } from 'react-redux';

@connect(store => {
  return {
    barCode: store.storeData.barCode,
  };
})
export class BarcodeApp extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <BarcodeScanner
          style={{ flex: 1 }}
          onBarcodeRead={({ data, type }) => {
            this.props.dispatch({ type: 'SET_BARCODE', payload: data });
            this.props.dispatch({ type: 'BARCODE_STATUS', payload: false });
            //Alert.alert(`Barcode '${data}' of type '${type}' was scanned.`);
          }}
          onException={exceptionKey => {
            // check instructions on Github for a more detailed overview of these exceptions.
            switch (exceptionKey) {
              case Exception.NO_PLAY_SERVICES:
              // tell the user they need to update Google Play Services
              case Exception.LOW_STORAGE:
              // tell the user their device doesn't have enough storage to fit the barcode scanning magic
              case Exception.NOT_OPERATIONAL:
              // Google's barcode magic is being downloaded, but is not yet operational.
              default:
                break;
            }
          }}
          focusMode={FocusMode.AUTO /* could also be TAP or FIXED */}
          cameraFillMode={CameraFillMode.FIT /* could also be FIT */}
          barcodeType={
            BarcodeType.CODE_128 |
            BarcodeType.EAN_13 |
            BarcodeType.EAN_8 /* replace with ALL for all alternatives */
          }
        />
      </View>
    );
  }
}
