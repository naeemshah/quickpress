import React, { Component } from 'react';
import  { RefreshControl } from 'react-native';
import {Spinner,Item,Input,Icon, Root,Container, Header, Content, List, ListItem, Thumbnail, Text, Body,Button } from 'native-base';
import { connect } from 'react-redux';
import {BarcodeApp} from './barcodeReader'
import {HeaderComp} from './headerComp'


 

@connect(store => {
  return {
    showBarCodeScanner: store.storeData.showBarCodeScanner,
    barCode:store.storeData.barCode
  }; 
})


export  class StoreConnectComp extends Component<Props> {

  constructor(props) {
    super(props);
  
  }

 showBC(){
     this.props.dispatch({type:"BARCODE_STATUS",payload:true});
  }

 


  render() {

    let barCode = (this.props.barCode) ? this.props.barCode.split("|") : null;

 return (
           <Container>
        <HeaderComp title={"Connect To Your Store"} left={false} righ={false} />
        <Content>
        

         <Item>
            <Icon active name='link' />
            <Input placeholder='Store URL'/>
          </Item>

         <Item>
          <Icon active name='key' />
            <Input placeholder='API Key' value={(barCode) ? barCode[0] : ""}/>
          </Item>

          <Item>
          <Icon active name='key' />
            <Input placeholder='API Key' value={(barCode) ? barCode[1] : ""}/>
          </Item>

          <Button success block >
            <Text>Connet</Text>
          </Button>

             <Button block onPress={this.showBC.bind(this)}><Text>Read Barcode</Text></Button>
        </Content>

      </Container>
    );
  }
}


