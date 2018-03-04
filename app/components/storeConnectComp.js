import React, { Component } from 'react';
import { RefreshControl } from 'react-native';
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

@connect(store => {
  return {
    showBarCodeScanner: store.storeData.showBarCodeScanner,
    barCode: store.storeData.barCode,
  };
})
export class StoreConnectComp extends Component<Props> {
  constructor(props) {
    super(props);
  }

  showBC() {
    this.props.dispatch({ type: 'BARCODE_STATUS', payload: true });
  }

  render() {
    let barCode = this.props.barCode ? this.props.barCode.split('|') : null;

    return (
      <Container>
        <HeaderComp title={'Connect To Your Store'} left={false} righ={false} />
        <Content>
          <Item floatingLabel style={{ marginTop: 100 }}>
            <Label>Wordpress Store Link</Label>
            <Input />
          </Item>

          <Item floatingLabel style={{ marginTop: 10 }}>
            <Label>Woo Consumer key</Label>
            <Input value={(barCode) ? barCode[0] : ""} />
          </Item>
          <Item floatingLabel style={{ marginTop: 10 }}>
            <Label>Woo Consumer secret</Label>
            <Input value={(barCode) ? barCode[1] : ""} />
          </Item>

          <Grid style={{ height: 50, marginTop: 25 }}>
            <Col style={{ marginLeft: 10 }}>
              <Button success disabled={true}>
                <Text>Connet To Store</Text>
              </Button>
            </Col>

            <Col style={{ marginRight: 10 }}>
              <Button block  onPress={this.showBC.bind(this)}>
                <Text>Read Barcode</Text>
              </Button>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
