import React, { Component } from 'react';
import { RefreshControl, AsyncStorage, View } from 'react-native';
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
  Fab,
  ActionSheet,
} from 'native-base';
import { connect } from 'react-redux';
import { getProducts, changeStock } from '../.././actions/productsAction';
import { ProductComp } from './ProductComp';
import { InfiniteScroll } from '.././infiniteScrollComp';

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
    refreshing: store.product.refreshing,
    storeUrl: store.storeData.storeUrl,
    APIKey: store.storeData.APIKey,
    APISecret: store.storeData.APISecret,
    lastPageReached: store.product.lastPageReached,
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

  stockActions(productsID) {
    ActionSheet.show(
      {
        options: [
          { text: 'In Stock', iconColor: '#2c8ef4' },
          { text: 'Out of Stock', iconColor: '#2c8ef4' },
          { text: 'Cancel', icon: 'close', iconColor: '#25de5b' },
        ],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 3,
        title: 'Stock Status',
      },
      buttonIndex => {
        if (buttonIndex === 2) return;
        this.props.dispatch(
          changeStock(productsID, buttonIndex === 0 ? true : false)
        );

        //  alert(productsID);
      }
    );
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

  getProducts(refresh) {
    let first = refresh !== undefined ? refresh : false;
    if (
      this.props.authenticated &&
      !this.props.lastPageReached &&
      !this.props.loading
    )
      this.props.dispatch(
        getProducts(
          this.props.storeUrl,
          this.props.APIKey,
          this.props.APISecret,
          first
        )
      );
  }

  updateContent() {
    getProducts();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Fab style={{ backgroundColor: '#f17d00' }} position="bottomRight">
          <Icon name="plus" />
        </Fab>
        <InfiniteScroll
          onLoadMoreAsync={this.getProducts.bind(this, true)}
          distanceFromEnd={10}
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={() => {
                this.updateContent();
              }}
            />
          }
        >
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

          <List style={{ backgroundColor: 'white' }}>
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
                    <Button
                      transparent
                      onPress={this._onForward.bind(this, e.id)}
                      id={e.id}
                    >
                      <Text style={{ marginLeft: -3 }}>Edit</Text>
                    </Button>
                  </Body>
                  {e.changingStock !== undefined && e.changingStock ? (
                    <Button small disabled style={{}}>
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                        Changing Stock
                      </Text>
                    </Button>
                  ) : (e.changingStock === undefined && e.in_stock) ||
                  (!e.changingStock && e.in_stock) ? (
                    <Button
                      onPress={this.stockActions.bind(this, e.id)}
                      small
                      success
                      style={{}}
                    >
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                        In Stock
                      </Text>
                    </Button>
                  ) : (
                    <Button
                      onPress={this.stockActions.bind(this, e.id)}
                      small
                      danger
                      style={{}}
                    >
                      <Text style={{ fontSize: 10, fontWeight: 'bold' }}>
                        Out of Stock
                      </Text>
                    </Button>
                  )}
                </ListItem>
              );
            })}
          </List>
        </InfiniteScroll>
      </View>
    );
  }
}
