import React, { Component } from 'react';
import {
  RefreshControl,
  Dimensions,
  Alert,
  AsyncStorage,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
  Spinner,
  Grid,
  Row,
  Col,
  Item,
  Label,
  Input,
  Icon,
  Root,
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Body,
  Button,
} from 'native-base';
import { connect } from 'react-redux';
import { BarcodeApp } from './barcodeReader';
import { HeaderComp } from './headerComp';

import { Authentication } from '.././actions/storeConnectActions';

import { NavigationActions } from 'react-navigation';

@connect(store => {
  return {
    showBarCodeScanner: store.storeData.showBarCodeScanner,
    barCode: store.storeData.barCode,
    storeURL: store.storeData.storeUrl,
    connectBtn: store.storeData.connectBtn,
    connectBtnText: store.storeData.connectBtnText,
  };
})
export class StoreConnectComp extends Component<Props> {
  constructor(props) {
    console.log('fsdfdsf');
    super(props);
    this.state = {
      url: 'http://34.216.246.14/wordpress/',
      key: 'ck_3c10d383ee830a98b36a6084b83e2a25d6cfb3d1',
      secret: 'cs_d0fe5df2a4dba8791bf2c9a3299e6dccea3ca19a',
      urlE: '#cccccc',
      keyE: '#cccccc',
      secretE: '#cccccc',
    };
  }

  componentDidMount() {
    this.SetBarCode();
  }

  componentDidUpdate() {
    this.SetBarCode();
  }

  SetBarCode() {
    let barCode = this.props.barCode ? this.props.barCode.split('|') : null;
    if (barCode && this.state.key != barCode[0]) {
      this.setState({ key: barCode[0], secret: barCode[1] });
    }
  }

  connectToStore() {
    let urlC = this.state.url === '' ? 'red' : '#ccc';
    let keyC = this.state.key === '' ? 'red' : '#ccc';
    let secretC = this.state.secret === '' ? 'red' : '#ccc';
    this.setState({ urlE: urlC, keyE: keyC, secretE: secretC });
    if (
      this.state.url === '' ||
      this.state.key === '' ||
      this.state.secret === ''
    ) {
      return;
    }
    this.props.dispatch(
      Authentication(this.state.url, this.state.key, this.state.secret)
    );
    // AsyncStorage.setItem('@QuckPress:storeURL', "asfdf");
    // let response =  AsyncStorage.getItem('@QuckPress:storeURL');
    //  alert("fdsfd");
  }

  showBC() {
    //this.props.dispatch({ type: 'BARCODE_STATUS', payload: true });
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: 'BarCode',
      params: { name: 'Shubhnik' },
    });
    this.props.navigation.dispatch(navigateToScreen2);
  }

  render() {
    let { height, width } = Dimensions.get('window');
    return (
      <Container>
        <HeaderComp title={'Connect To Your Store'} left={false} righ={false} />
        <Content>
          <ImageBackground
            style={[styles.backgroundImage, { height: height, width: width }]}
            source={require('.././images/2.jpg')}
          >
            <Item
              floatingLabel
              style={{ marginTop: 100, borderColor: this.state.urlE }}
            >
              <Label>Wordpress Store Link</Label>
              <Input
                value={this.state.url}
                onChangeText={url => this.setState({ url })}
              />
            </Item>

            <Item
              floatingLabel
              style={{ marginTop: 10, borderColor: this.state.keyE }}
            >
              <Label>Woo Consumer key</Label>
              <Input
                value={this.state.key}
                onChangeText={key => this.setState({ key })}
              />
            </Item>
            <Item
              floatingLabel
              style={{ marginTop: 10, borderColor: this.state.secretE }}
            >
              <Label>Woo Consumer secret</Label>
              <Input
                value={this.state.secret}
                onChangeText={secret => this.setState({ secret })}
              />
            </Item>

            <Grid style={{ height: 50, marginTop: 25 }}>
              <Col style={{ marginLeft: 10 }}>
                <Button
                  onPress={this.connectToStore.bind(this)}
                  success
                  disabled={this.props.connectBtn}
                >
                  <Text>{this.props.connectBtnText}</Text>
                </Button>
              </Col>

              <Col style={{ marginRight: 10 }}>
                <Button block onPress={this.showBC.bind(this)}>
                  <Text>Barcode Scan</Text>
                </Button>
              </Col>
            </Grid>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
