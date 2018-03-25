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
  Picker,
  Segment,
  radio
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
    title: 'Update Product', 
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
    // alert('fdsfd');
    // const navigateToScreen2 = NavigationActions.navigate({
    //   routeName: 'Modal',
    // });
    // this.props.navigation.dispatch(navigateToScreen2);
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
          <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
            {this.props.currentProduct.name}
          </Text>
          <Card style={{ flex: 0 }}>
            <Text style={{ textAlign: 'center', fontStyle: 'italic' }}>
              Product Images
            </Text>
            <CardItem>
              {this.props.currentProduct.images.map((e, i) => {
                return (
                  <Item
                    onPress={this.addImage.bind(this, i)}
                    style={{ borderColor: 'Green', borderSize: 3 }}
                  >
                    <Thumbnail square large source={{ uri: e.src }} />
                  </Item>
                );
              })}
            </CardItem>
          </Card>

<Form>
  <Item floatingLabel>
    <Label>Name</Label>
      <Input placeholder="Product Name" onChangeText={name => this.setState({ name })} value={this.state.name} />
  </Item>

   <Picker    iosHeader="Select one"
              mode="dropdown"
              placeholder="Product Type"
              selectedValue={this.state.selected1} >
              <Item label="Simple" value="key0" />
              <Item label="Grouped" value="key1" />
              <Item label="External" value="key2" />
             </Picker>

  <Picker    iosHeader="Select one"
              mode="dropdown"
              placeholder="Status"
              selectedValue={this.state.key2} >
              <Item label="Publish" value="key0" />
              <Item label="Pending" value="key1" />
              <Item label="Draft" value="key2" />
       </Picker>
   <Item floatingLabel>
    <Label>Short Discription</Label>
      <Input placeholder=""  />
  </Item> 
  <Item floatingLabel>
    <Label>Full Discription</Label>
      <Input multiline placeholder=""   />
  </Item>  
   <Item floatingLabel>
    <Label>Reguller Price</Label>
      <Input  placeholder=""   />
  </Item> 
  <Item floatingLabel>
    <Label>Sale Price</Label>
      <Input  placeholder=""   />
  </Item> 
  <Item floatingLabel>
    <Label>Weight</Label>
      <Input  placeholder=""   />
  </Item> 
  <Item floatingLabel>
    <Label>Data on sale from</Label>
      <Input   type="date"   />
  </Item>  
  <Item floatingLabel>
    <Label>Data on sale to</Label>
      <Input   type="date"   />
  </Item>     
   
      <Segment>
              <Button first><Text>Purchsable On</Text></Button>
              <Button last active><Text>Purchsable Off</Text></Button>
      </Segment> 
       <Segment>
              <Button first><Text>Instock</Text></Button>
              <Button last active><Text>Out of stock</Text></Button>
      </Segment> 
       <Segment>
              <Button first><Text>Shipping On</Text></Button>
              <Button last active><Text>Shipping Off</Text></Button>
      </Segment>  
  

  <Item last>
    <Input placeholder="Password" />
  </Item>

            <Item last>
              <Button onPress={this.showModal.bind(this)}>
                <Text>Update</Text>
              </Button>
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
