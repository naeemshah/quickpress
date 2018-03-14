import React, { Component } from 'react';
import { RefreshControl, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Modal, TouchableHighlight, View } from 'react-native';
import {
  Footer,
  FooterTab,
  Text,
  Button,
  Content,
  Grid,
  Row,
  Col,
  Card,
  CardItem,
  Body,
  Thumbnail,
  Left,
  Form,
  Item,
  Input,
  Container,
  Label,
} from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

var ImagePicker = require('react-native-image-picker');

@connect(store => {
  return {
    currentProduct: store.product.currentProduct,
  };
})
export class ProductComp extends Component<Props> {
  static navigationOptions = {
    title: 'Product',
    gesturesEnabled: false,
    headerRight: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentProduct.name,
      modalVisible: false,
      imageindex: null,
    };
  }

  componentDidMount() {}

  showModal() {
    alert('fdsfd');
    const navigateToScreen2 = NavigationActions.navigate({
      routeName: 'Modal',
    });
    this.props.navigation.dispatch(navigateToScreen2);
  }

  addImage(imageIndex) {
    this.setState({ imageindex: imageIndex });
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let source = response.uri;

        this.props.dispatch({
          type: 'SET_PRODUCT_IMAGE',
          payload: { index: this.state.imageindex, src: source },
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem>
              {this.props.currentProduct.images.map((e, i) => {
                return (
                  <Item onPress={this.addImage.bind(this, i)}>
                    <Thumbnail source={{ uri: e.src }} />
                  </Item>
                );
              })}
            </CardItem>
          </Card>

          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input
                placeholder="Product Name"
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
            </Item>

            <Item last>
              <Input placeholder="Password" />
            </Item>

            <Item last>
              <Button onPress={this.showModal.bind(this)}>
                <Text>dfsdf</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
