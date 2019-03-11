import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import Layout from "../constants/Layout";
import Touch from 'react-native-touch';
import {postAddCommentRequest} from '../redux/action';
import {connect} from 'react-redux';

 class CommentSection extends Component {
  onAddImage=async()=>{
    await Expo.ImagePicker.launchImageLibraryAsync();
  }
  render() {
    const { comment, onSubmit, onChange } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <View style={styles.wrapper}>
          <Image
            style={styles.userAvatar}
            source={require("../assets/images/guide-small.png")}
          />
          <TextInput
            multiline={true}
            style={styles.inputText}
            value={comment}
            onChangeText={(text)=> { onChange(text) }}
            placeholder="Ask question or share your experience here"
          />
          {
            comment == "" ?
            <View style={styles.addImageView}>
              <Touch 
              onPress={()=>this.onAddImage()}
              >
                <Image  resizeMode='contain' style={styles.addImage} source={require("../assets/images/add-photo.png")} />
              </Touch>
            </View>
            :
            <View>
              <Touch 
              onPress={onSubmit}
              >
                <Text style={{color:'#FF6CC9'}} >Send</Text>
              </Touch>
            </View>
          }
        </View>
      </View>
    );
  }
}
const mapStateToProps=state=>{
  return{

  }
}
const mapDispatchToProps=dispatch=>{
  return{
    addComment:()=>dispatch(postAddCommentRequest()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentSection)


const styles = StyleSheet.create({
  inputText: {
    borderWidth: 1,
    height: Layout.window.height * 0.1,
    width: Layout.window.width * 0.65,
    flexWrap: "wrap",
    borderRadius: 7,
    paddingLeft: 7,
    paddingLeft: 7
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 7
  },
  userAvatar: {
    width: Layout.window.width * 0.13,
    height: Layout.window.width * 0.13,
    borderRadius: 30
  },
  addImageView:{
      width:30,
      height:25
  },
  addImage:{
      width:"100%",
      height:'100%'
  }
});
