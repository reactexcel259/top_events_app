import React, { Component } from "react";
import { Text, View ,StyleSheet, TouchableOpacity, Image, Linking} from "react-native";
import Layout from "../constants/Layout";
import {LinearGradient,Permissions} from 'expo';
import Modal from "react-native-modalbox";
import { FontAwesome ,EvilIcons } from '@expo/vector-icons';
import moment from 'moment';

export default class ImagePickerModal extends Component {
  constructor(props){
    super(props);
    this.state={
      isOpen:this.props.isOpen,
      images:[]
    }
  }
  onClose = () => {
    this.setState({
      isOpen: false
    },()=>{
      this.props.onCloseImage()
    })
  }

  componentWillReceiveProps(nextprops){
    const { isOpen } = nextprops;
    this.setState({
      isOpen: isOpen
    })
  }

  onAddPhoto = async () => {
    const { onCloseImage } = this.props;
    onCloseImage();
    let res = await Expo.ImagePicker.launchImageLibraryAsync({
          exif: true,
          quality: 0.7,
          base64: true,
          aspect: [4, 3]
        });
        console.log(res,"GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
      if(res)
      this.uploadImage(res)
  };

  onCameraPhoto = async () => {
    const { onCloseImage } = this.props;
    onCloseImage()
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      let finalStatus = existingStatus;

      // only ask if permissions have not already been determined, because
      // iOS won't necessarily prompt the user a second time.
      if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        finalStatus = status;
      }
      if(finalStatus == 'granted') {
        let res = await Expo.ImagePicker.launchCameraAsync({
          exif: true,
          quality: 0.7,
          base64: true,
          aspect: [4, 3]
        }).catch(error => console.log(finalStatus, { error }));
        console.log(finalStatus,res,"GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG");
        if(res)
        
          this.uploadImage(res);
      }
    
  }

  uploadImage = (res) => {
    const fileType = res.uri.split('.');
        let base64Img = `data:image/${fileType[fileType.length-1]};base64,${res.base64}`
        let apiUrl = `https://api.cloudinary.com/v1_1/dlhe2zlxc/image/upload`;
  
        let data = {
          "file": base64Img,
          "upload_preset": "ty5saxly",
        }

        let url =  fetch(apiUrl, {
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json'
          },
          method: 'POST',
        }).then(async r => {
            let data = await r.json()
            this.props.onUpload(data);            
            return data
        }).catch(err=>console.log(err))
  }

  render(){
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
          <TouchableOpacity style={{justifyContent:'center',flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:'lightgray'}} onPress={this.onCameraPhoto} >
            <View style={styles.viewContainer} >
              <Text style={styles.textStyle} > Take Picture.... </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center',flex:1,flexDirection:'row'}} onPress={this.onAddPhoto} >
            <View style={styles.viewContainer} >
              <Text style={styles.textStyle} > Choose From Library </Text>
            </View>
          </TouchableOpacity>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    borderWidth:1,
    borderColor:'lightgray',
    width: Layout.window.width - 30,
    height: 80,
    backgroundColor: "#fff",
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
