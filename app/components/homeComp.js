import React, { Component } from 'react';
import  { RefreshControl } from 'react-native';
import {Spinner,Item,Input,Icon, Root,Container, Header, Content, List, ListItem, Thumbnail, Text, Body,Button } from 'native-base';
import { connect } from 'react-redux';
import {  getProducts } from '.././actions/productsAction';
import {BarcodeApp} from '.././components/barcodeReader'


 

@connect(store => {
  return {
    products: store.product.products,
    loading:store.product.loading,
    showBarCodeScanner: store.storeData.showBarCodeScanner,
    barCode:store.storeData.barCode
  }; 
})


export  class HomeComp extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loading:true
    };
  }

  componentDidMount(){
        this.getProducts();  
  }

  componentDidUpdate(){
     if(this.state.loading !== this.props.loading)
     this.setState({loading:(this.props.loading)?true:false});
  }

  getProducts(){
     this.props.dispatch(getProducts());
  }


  showBC(){
     this.props.dispatch({type:"BARCODE_STATUS",payload:true});
  }

 


  render() {
       
    if(this.props.showBarCodeScanner){

      return (
  <Container>
                <BarcodeApp />
            </Container>
    );

    }


     if(this.props.barCode){

      let br = this.props.barCode.split("|");

      return (
  <Container>
               <Content>
          <Item success>
            <Input placeholder='Textbox with Success Input' value={br[0]}/>
            <Icon name='checkmark-circle' />
          </Item>
          <Item success>
            <Input placeholder='Textbox with Success Input' value={br[1]}/>
            <Icon name='checkmark-circle' />
          </Item>
        </Content>

            </Container>
    );

    }
    
   
    return (
      <Root>
           <Container>
        <Header />
        <Content>
        <Spinner color='green' style={(this.state.loading) ? {} : {display:"none"}} />
        <Text style={(this.state.loading) ? {textAlign:"center"} : {display:"none"}}>Loading Products...</Text>
          <List>
          {this.props.products.map((e,i)=>{
               return (
                <ListItem>
              <Thumbnail square size={80} source={{ uri: e.images[0].src }} />
              <Body>
                <Text>{e.name}</Text>
                <Text note>Stock : {(!e.stock_quantity)?0:e.stock_quantity}</Text>
              </Body>
            </ListItem>
                );
          })}
         
            
          </List>
             <Button onPress={this.showBC.bind(this)}><Text>Read Barcode</Text></Button>
        </Content>

      </Container>

      </Root>
    );
  }
}


