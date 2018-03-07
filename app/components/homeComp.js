import React, { Component } from 'react';
import { AsyncStorage, RefreshControl } from 'react-native';
import {
  Spinner,
  Item,
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
  Drawer
} from 'native-base';
import { connect } from 'react-redux';
import { getProducts } from '.././actions/productsAction';
import { BarcodeApp } from './barcodeReader';
import { StoreConnectComp } from './storeConnectComp';
import { FooterComp } from './footerComp';
import { SidebarComp } from './sidebarComp';
import { BlockLoader } from './block_loader';
import { HeaderComp } from './headerComp';

@connect(store => {
  return {
    products: store.product.products,
    loading: store.product.loading,
    showBarCodeScanner: store.storeData.showBarCodeScanner,
    barCode: store.storeData.barCode,
    storeUrl: store.storeData.storeUrl,
    APIKey: store.storeData.APIKey,
    APISecret: store.storeData.APISecret,
    authenticated: store.storeData.authenticated,
  };
})
export class HomeComp extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loading: true,
      showBlockLoader: true,
    };
  }

  componentDidMount() {
   // AsyncStorage.removeItem('StoreKeys');
    AsyncStorage.getItem('StoreKeys').then(value => {
      if (value) {
        let storeData = JSON.parse(value);

        this.props.dispatch({
          type: 'SET_STORE_KEYS',
          payload: {
            storeUrl: storeData.storeUrl,
            key: storeData.key,
            secret: storeData.secret,
          },
        });

       
      }
       this.setState({ showBlockLoader: false });
    });
    this.getProducts();
  }

  componentDidUpdate() {
    if (this.state.loading !== this.props.loading)
      this.setState({ loading: this.props.loading ? true : false });

    this.getProducts();
  }

  getProducts() {
    if (this.props.authenticated)
      this.props.dispatch(
        getProducts(
          this.props.storeUrl,
          this.props.APIKey,
          this.props.APISecret
        )
      );
  }

  closeDrawer(){

  }

  showBC() {
    this.props.dispatch({ type: 'BARCODE_STATUS', payload: true });
  }

  render() {

     

    if (this.state.showBlockLoader) {
      return <BlockLoader />;
    }

    if (this.props.showBarCodeScanner) {
      return (
        <Container>
          <BarcodeApp />
        </Container>
      );
    }

    if (!this.props.authenticated) {
      return (
        <Root>
          <StoreConnectComp />
        </Root>
      );
    }

    return (
      <Root>
        <Container>

          <HeaderComp title={'Products'} left={false} righ={false} />
         
          <Content>
            <Spinner
              color="green"
              style={this.state.loading ? {} : { display: 'none' }}
            />
            <Text
              style={
                this.state.loading
                  ? { textAlign: 'center' }
                  : { display: 'none' }
              }
            >
              Loading Products...
            </Text>
            <List>
              {this.props.products.map((e, i) => {
                return (
                  <ListItem>
                    <Thumbnail
                      square
                      size={80}
                      source={{ uri: e.images[0].src }}
                    />
                    <Body>
                      <Text>{e.name}</Text>
                      <Text note>
                        Stock : {!e.stock_quantity ? 0 : e.stock_quantity}
                      </Text>
                    </Body>
                  </ListItem>
                );
              })}
            </List>
          </Content>
          <FooterComp />
        </Container>
      </Root>
    );
  }
}
