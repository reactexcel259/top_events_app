import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  StatusBar,
  Linking,
  ScrollView,
  Switch,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../redux/action';
import { LinearGradient } from "expo";
import Layout from "../constants/Layout";
import Touch from "react-native-touch";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import ImagePickerModal from '../components/imagePickerModal';

class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      addedImage: [], 
      buttonText: "", 
      isDone: false, 
      isFacebook: false,
      value: "" ,
      image:[],
      imagepicker: false
    };
  }

  removeImage = index => {
    if (this.state.isDone && this.state.image.length == 1) {
      alert("You must have to add a photo");
    } else {
      let addedImage = this.state.image.filter((img, id) => id !== index);
      this.setState({ image:addedImage });
    }
  };
  onSubmit = () => {
    const { value, image } = this.state;
    const { navigation, postAddCommentRequest, user } = this.props;
    let item = navigation.state.params.item;
    let payload = {
      id: item._id,
      token : user.user.status.token,
      data: {
        comment: value,
        image: image
      }
    }
    postAddCommentRequest(payload);
    if(this.state.isFacebook){
      Linking.openURL(
        `https://www.facebook.com/sharer/sharer.php?u=https://topeventsinjamaica.com/#/event-detail/${item._id}`
      )
    }
    this.setState({
      value:'',
      image: []
    })
    navigation.navigate("CityEventDescription", { item: item })
  }

  openImageModal = () => {
    this.setState({
      imagepicker: true
    })
  }
  closeimageModal = () => {
    this.setState({
      imagepicker:false
    })
  }

  onUpload = (data) => {
    let image = this.state.image
    if(data && data.secure_url){
      image.push(data.secure_url)
    }
    this.setState({
      image
    })
  }

  _renderItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={[
          styles.addedimageWrapper,
          { marginRight: index == this.state.image.length - 1 ? 7 : -15 }
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
      this.setState({ isDone: !this.state.isDone },()=>{
        this.props.navigation.goBack()
      });
  };
  onSwitch = (val) => {
    if(val == 'facebook') {
      this.setState({
        isFacebook : !this.state.isFacebook
      })
    }
  }
  _keyExtractor = (item, index) => item;
  render() {
    console.log(this.state.image,"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC");
    
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
              <Text style={styles.checkinText}>Check in</Text>
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
                <Touch onPress={this.openImageModal}>
                  <View style={styles.addimageView}>
                    <Image
                      style={styles.addImage}
                      resizeMode="contain"
                      source={require("../assets/images/add-photo-active.png")}
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
              data={this.state.image}
              extraData={this.state.image}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          
            <View style={styles.toggleButton}>
              <View style={styles.toggle}>
                <Text>Share to Facebook</Text>
                <TouchableOpacity onPress={() => this.onSwitch('facebook') } >
                {
                  this.state.isFacebook ?
                    <Image style={{height:20,width:35}} mode='contain' source={require('../assets/images/switcher_on.png')}  />
                  :
                   <Image style={{height:20,width:35}} mode='contain' source={require('../assets/images/switcher_off.png')}  />
                }
              </TouchableOpacity>
              </View>
              {/* <View style={styles.toggle}>
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
              </View> */}
            </View>
          <View style={styles.buttonView}>
          <TouchableOpacity onPress={this.onSubmit} >
            <LinearGradient
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              colors={["#ff6cc9", "#8559f0"]}
              style={styles.submitButton}
            >
              <Text style={styles.submitText}>Submit</Text>
            </LinearGradient>
            </TouchableOpacity>
            <View>
              <Touch
                onPress={
                   this.onDone
                }
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Touch>
            </View>
          </View>
        </View>
        <ImagePickerModal
          isOpen={this.state.imagepicker}
          onCloseImage={this.closeimageModal}
          onUpload={this.onUpload}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    width: Layout.window.width,
    height: Layout.window.width * 0.48,
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
    paddingTop: 20,
    paddingBottom:15
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});


const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(CheckIn);