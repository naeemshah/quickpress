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
  Drawer,
} from 'native-base';
import { connect } from 'react-redux';
import { getProducts } from '.././actions/productsAction';
import { BarcodeApp } from './barcodeReader';
import { StoreConnectComp } from './storeConnectComp';
import { FooterComp } from './footerComp';
import { SidebarComp } from './sidebarComp';
import { BlockLoader } from './block_loader';
import { HeaderComp } from './headerComp';
import { ProductListComp } from './Products/productListComp';
import {NavigationActions} from 'react-navigation';

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
  static navigationOptions = {
    title: 'Screen1',
    gesturesEnabled: false,
    headerLeft: null,
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      loading: true,
      showBlockLoader: true,
    };
  }

  componentDidMount() {
    //alert(store);
    //AsyncStorage.removeItem('StoreKeys');
    AsyncStorage.getItem('StoreKeys').then(value => {
      if (value) {
        let storeData = JSON.parse(value);

        this.props.dispatch({
          type: 'SET_STORE_KEYS',
          payload: {
            storeUrl: storeData.storeUrl,
            key: storeData.key,
            secret: storeData.secret,
            auth: true,
          },
        });
      }
      this.setState({ showBlockLoader: false });
    });
  }

  componentDidUpdate() {
    if (this.state.loading !== this.props.loading)
      this.setState({ loading: this.props.loading ? true : false });

    //this.refs.Product_listing.scrollToEnd({animated: true});
  }

  showBC() {
   // this.props.dispatch({ type: 'BARCODE_STATUS', payload: true });
   
  }

  scrolled() {}
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  render() {
    if (this.state.showBlockLoader) {
      return <BlockLoader />;
    }

    // if (this.props.showBarCodeScanner) {
    //   return (
    //     <Container>
    //       <BarcodeApp />
    //     </Container>
    //   );
    // }

    if (!this.props.authenticated) {
      return (
        <Root>
          <StoreConnectComp navigation={this.props.navigation} />
        </Root>
      );
    }

    return (
      <Root>
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SidebarComp />}
          onClose={() => this.closeDrawer()}
        >
          <Container>
            <HeaderComp
              openDrawer={this.openDrawer.bind(this)}
              title={'Products'}
              left={true}
              right={true}
            />

            <ProductListComp navigation={this.props.navigation} />

            <FooterComp navigation={this.props.navigation}  />
          </Container>
        </Drawer>
      </Root>
    );
  }
}
