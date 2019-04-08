import React, { Component } from "react";
import { Text, View ,StyleSheet, TouchableOpacity, Image, Linking} from "react-native";
import Layout from "../constants/Layout";
import Modal from "react-native-modalbox";
import { FontAwesome ,EvilIcons } from '@expo/vector-icons';
import moment from 'moment';

export default class FullImageModal extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen:this.props.isOpen,
      images:[]
    }
  }
  
  componentWillReceiveProps(nextprops){
    const { isOpen } = nextprops;
    this.setState({
      isOpen: isOpen
    })
  }
  
  onClose = () => {
    this.setState({
      isOpen: false
    },()=>{
      this.props.onCloseFullImage()
    })
  }
  render(){
    const { item } = this.props;
    return(
         <Modal
          isDisabled={false}
          coverScreen={true}
          backdropPressToClose={true}
          swipeToClose={false}
          style={styles.modal}
          onClosed={this.onClose}
          isOpen={this.state.isOpen}
          position={"bottom"}
        >
          <View style={{backgroundColor:'transparent',paddingBottom:20}}>
            <EvilIcons onPress={this.onClose} name='close' size={40} color="#fff"/>
          </View>
          <Image
            style={{flex:1 }}
            resizeMode="cover"
            source={{ uri: item }}
          />
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    borderWidth:1,
    borderColor:'lightgray',
    width: Layout.window.width - 30,
    height: Layout.window.height - 120,
    backgroundColor: "transparent",
    borderRadius:10,
    bottom:20,
    elevation:5,
  },
  viewContainer:{
    marginTop:10,
    marginBottom:5
  },
  textStyle:{
    fontSize:16,
    fontWeight:'400',
    color:'#2a75e3',
  }
});
