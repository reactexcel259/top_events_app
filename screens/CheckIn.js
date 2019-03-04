import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TextInput } from "react-native";
import { LinearGradient } from "expo";
import Layout from "../constants/Layout";
import Touch from "react-native-touch";

export default class CheckIn extends Component {
  onAddPhoto = async () => {
    await Expo.ImagePicker.launchImageLibraryAsync();
  };

  render() {
    return (
      <View>
        <LinearGradient
          style={styles.linearGradient}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={["#ff6cc9", "#8559f0"]}
        >
          <View>
            <Text style={styles.checkinText}>check in</Text>
          </View>
          <View style={styles.userImageView}>
            <Image
              style={styles.userImage}
              source={require("../assets/images/photo2.png")}
            />
          </View>
        </LinearGradient>
        <View style={styles.bottomContentWrapper}>
          <View style={{ flexDirection: "column" }}>
            <View style={styles.inputView}>
              <TextInput placeholder="Add your message here" />
            </View>
            <View style={styles.addphotoView}>
              <Touch onPress={() => this.onAddPhoto()}>
                <View style={styles.addimageView}>
                  <Image
                    style={styles.addImage}
                    resizeMode="contain"
                    source={require("../assets/images/add-photo.png")}
                  />
                </View>
              </Touch>
              <View style={styles.addphotoTextView}>
                <Text style={styles.addphotoText}>Add photo</Text>
              </View>
            </View>
          </View>
          <View style={styles.buttonView}>
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={["#ff6cc9", "#8559f0"]}
              style={styles.submitButton}
            >
              <Text style={styles.submitText}>Submit</Text>
            </LinearGradient>
            <View>
              <Text style={styles.cancelText}>Cancel</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    width: Layout.window.width,
    height: Layout.window.width * 0.6,
    flexDirection: "column",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 17,
    paddingTop: Layout.window.width / 3.6
  },
  userImage: {
    borderRadius: 40,
    width: "100%",
    height: "100%"
  },
  userImageView: {
    width: 70,
    height: 70,
    marginTop: Layout.window.width * 0.148
  },
  checkinText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#fff"
  },
  addphotoView: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth:1,
    height:200
  },
  submitButton: {
    width: Layout.window.width / 1.6,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 50
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  bottomContentWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: Layout.window.width,
    height: Layout.window.height - Layout.window.width * 0.6,
    paddingLeft: 15
  },
  inputView: {
    marginBottom: 20
  },
  addphotoTextView: {
    marginLeft: 15
  },
  addphotoText: {
    color: "#808080"
  },
  cancelText: {
    color: "#808080",
    fontSize: 17
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17
  },
  addimageView: {
    width: 35,
    height: 35
  },
  addImage: {
    width: "100%",
    height: "100%"
  }
});
