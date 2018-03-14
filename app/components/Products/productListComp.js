import React, { Component } from 'react';
import { RefreshControl, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Footer,
  Body,
  FooterTab,
  Text,
  Button,
  Content,
  Spinner,
  List,
  ListItem,
  Thumbnail,
} from 'native-base';
import { connect } from 'react-redux';
import { getProducts } from '../.././actions/productsAction';
import { ProductComp } from './ProductComp';

import {
  StackNavigator,
  Navigator,
  NavigationActions,
  addNavigationHelpers,
} from 'react-navigation';

@connect(store => {
  return {
    authenticated: store.storeData.authenticated,
    products: store.product.products,
    loading: store.product.loading,
    storeUrl: store.storeData.storeUrl,
    APIKey: store.storeData.APIKey,
    APISecret: store.storeData.APISecret,
  };
})
export class ProductListComp extends Component<Props> {
  constructor(props) {
    super(props);
    //  this._onForward = this._onForward.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate() {
    if (this.props.products.length === 0 && !this.props.loading)
      this.getProducts();

    //this.refs.Product_listing.scrollToEnd({animated: true});
  }

  _onForward(productID) {
    this.props.dispatch({
      type: 'SET_CURRENT_PROD',
      payload: { id: productID },
    });
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: 'ProductDetail',
      params: { name: 'Shubhnik' },
    });
    this.props.navigation.dispatch(navigateToScreen2);
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

  render() {
    return (
      <Content>
        <Spinner
          color="green"
          style={this.props.loading ? {} : { display: 'none' }}
        />
        <Text
          style={
            this.props.loading ? { textAlign: 'center' } : { display: 'none' }
          }
        >
          Loading Products...
        </Text>

        <List>
          {this.props.products.map((e, i) => {
            return (
              <ListItem onPress={this._onForward.bind(this, e.id)} id={e.id}>
                <Thumbnail square size={80} source={{ uri: e.images[0].src }} />
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
    );
  }
}
