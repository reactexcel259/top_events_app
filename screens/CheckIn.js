import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  ScrollView,
  Switch
} from "react-native";
import { LinearGradient } from "expo";
import Layout from "../constants/Layout";
import Touch from "react-native-touch";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = { addedImage: [], buttonText: "", isDone: false, value: "" };
  }

  onAddPhoto = async () => {
    let res = await Expo.ImagePicker.launchImageLibraryAsync();
    this.setState({ addedImage: [...this.state.addedImage, res.uri] });
    if (this.state.addedImage.length > 0) {
      this.setState({ buttonText: "Done" });
    }
  };
  removeImage = index => {
    if (this.state.isDone && this.state.addedImage.length == 1) {
      alert("You must have to add a photo");
    } else {
      let addedImage = this.state.addedImage.filter((img, id) => id !== index);
      this.setState({ addedImage });
    }
  };
  _renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={[
          styles.addedimageWrapper,
          { marginRight: index == this.state.addedImage.length - 1 ? 7 : -15 }
        ]}
      >
        <View style={styles.removeImageIcon}>
          <EvilIcons
            onPress={() => this.removeImage(index)}
            name="close-o"
            size={32}
            color="grey"
          />
        </View>
        <Image
          style={{ width: "80%", height: "80%" }}
          resizeMode="cover"
          source={{ uri: item }}
        />
      </View>
    );
  };
  onDone = () => {
    if (this.state.value == "") {
      alert("add a comment");
    } else if (!this.state.addedImage.length > 0) {
      alert("add a photo");
    } else {
      this.setState({ isDone: !this.state.isDone });
    }
  };
  _keyExtractor = (item, index) => item;
  render() {
    return (
      <ScrollView>
        <View>
          <LinearGradient
            style={styles.linearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={["#ff6cc9", "#8559f0"]}
          >
            <View style={styles.confirmationButton}>
              <Touch onPress={this.onDone}>
                <Text style={styles.confirmationButtonText}>
                  {this.state.isDone ? "Cancel" : "Done"}
                </Text>
              </Touch>
            </View>
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
          <View style={{ flexDirection: "column", paddingLeft: 15 }}>
            <View style={styles.inputView}>
              {this.state.isDone && <Text>{this.state.value}</Text>}
              {!this.state.isDone && (
                <TextInput
                  multiline={true}
                  value={this.state.value}
                  onChangeText={value => this.setState({ value: value })}
                  placeholder="Add your message here"
                />
              )}
            </View>
            {!this.state.isDone && (
              <View style={styles.addphotoView}>
                <Touch onPress={this.onAddPhoto}>
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
            )}
          </View>
          <View style={styles.addedImageView}>
            <FlatList
              style={{ paddingLeft: 15 }}
              data={this.state.addedImage}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {this.state.isDone && (
            <View style={styles.toggleButton}>
              <View style={styles.toggle}>
                <Text>Share to Facebook</Text>
                <Switch
                  style={{
                    marginBottom: 10,
                    width: 90,
                    marginRight: 6,
                    marginLeft: 6
                    // backgroundColor:'red'
                  }}
                  value={true}
                  _thumbColor="white"
                  trackColor="red"
                />
              </View>
              <View style={styles.toggle}>
                <Text>Share to Google</Text>
                <Switch
                  style={{
                    marginBottom: 10,
                    width: 90,
                    marginRight: 6,
                    marginLeft: 6
                  }}
                  value={true}
                  _thumbColor="white"
                  // trackColor="#ff6cc9"
                />
              </View>
              <View style={styles.toggle}>
                <Text>Share to Instagram</Text>
                <Switch
                  style={{
                    marginBottom: 10,
                    width: 90,
                    marginRight: 6,
                    marginLeft: 6
                  }}
                  value={true}
                  _thumbColor="white"
                  // trackColor="#ff6cc9"
                  // thumbColor="red"
                />
              </View>
            </View>
          )}
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
              <Touch
                onPress={
                  this.state.isDone ? () => this.onDone() : () => console.log()
                }
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Touch>
            </View>
          </View>
        </View>
      </ScrollView>
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
    zIndex: 1,
    position: "absolute",
    bottom: -35,
    right: Layout.window.width / 2.6
  },
  checkinText: {
    fontWeight: "bold",
    fontSize: 19,
    color: "#fff"
  },
  addphotoView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  submitButton: {
    width: Layout.window.width / 1.6,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 22,
    marginBottom: 22
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  bottomContentWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: Layout.window.width,
    height: Layout.window.height - Layout.window.width * 0.6,
    paddingLeft: 15
  },
  inputView: {
    marginBottom: 10,
    marginTop: 40
  },
  addphotoTextView: {
    marginLeft: 15
    // marginBottom: 10
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
  confirmationButton: {
    position: "absolute",
    zIndex: 1,
    top: StatusBar.currentHeight + StatusBar.currentHeight / 2,
    right: StatusBar.currentHeight
  },
  confirmationButtonText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#fff"
  },
  removeImageIcon: {
    zIndex: 5,
    position: "absolute",
    top: 13,
    right: 13
    // backgroundColor:'red'
  },
  toggleButton: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
