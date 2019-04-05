import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList, TextInput, Image } from "react-native";
import Layout from "../constants/Layout";
import Touch from 'react-native-touch';
import {postAddCommentRequest} from '../redux/action';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

 class CommentSection extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={[
          styles.addedimageWrapper,
          { marginRight: index == this.props.image.length - 1 ? 7 : -15 }
        ]}
      >
        <Image
          style={{ width: "80%", height: "80%" }}
          resizeMode="cover"
          source={{ uri: item }}
        />
      </View>
    );
  };

  render() {
    const { comment, onSubmit, onChange, onAddImage, image } = this.props;
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
        <View style={styles.wrapper}>
          <Image
            style={styles.userAvatar}
            source={require("../assets/images/user.png")}
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
              onPress={()=>{onAddImage()}}
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
        {
          image && image.length > 0 &&
          <View style={styles.wrapper} >
            <View style={styles.addedImageView}>
                <FlatList
                  style={{ paddingLeft: 15 }}
                  data={image}
                  extraData={image}
                  keyExtractor={(item, index) => item}
                  renderItem={this._renderItem}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  />
              </View>
          </View>
        }
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
  // mapStateToProps,
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
  addedImageView: {
    height: 130
  },
  addedimageWrapper: {
    width: 130,
    height: 130,
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 7
  },
  userAvatar: {
    width: 20,
    height: 30,
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
