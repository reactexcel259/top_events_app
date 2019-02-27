import React, { Component } from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import Layout from "../constants/Layout";

export default class CommentSection extends Component {
  render() {
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
            placeholder="Ask question or share your experience hare"
          />
          <View style={styles.addImageView}>
            <Image resizeMode='contain' style={styles.addImage} source={require("../assets/images/add-photo.png")} />
          </View>
        </View>
      </View>
    );
  }
}
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
