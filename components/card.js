import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Layout from "../constants/Layout";
import { LinearGradient, Font } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import moment from 'moment'

const image = [
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  }
]

export default class Card extends React.Component {
  render() {
    const { isWishlist ,item} = this.props;
    const data = image.map((data, i) => {
      return (
        <View key={i} style={[styles.peopleLiked, { zIndex: image.length - i }]}>
          <Image
            style={styles.peopleLikedImage}
            source={require("../assets/images/photo2.png")}
          />
        </View>
      );
    });
    return (
      <View
        style={{
          elevation: 5,
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "white",
          borderRadius: 5,
          height: Layout.window.height/1.9,
          margin: 10,
          marginTop: StatusBar.currentHeight
        }}
      >
      <Text style={{paddingLeft:5,paddingTop:5,paddingBottom:5}}>
        { item ?
          moment(item.start).format("D MMM, dddd")
          :
          moment().format("D MMM, dddd")
        }
      </Text>
        <Image
          source={
            item.image ?
           { uri:item.image.secure_url} :require( '../assets/images/no-thumbnail.png')
          }
          style={{
            height: 150,
            width: Layout.window.width * 0.912,
            borderRadius: 5,
            margin: 5
          }}
          // mode="contain"
        />

        <View style={{ marginTop: 5, marginBottom: 5 ,marginLeft:5}}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
          {item.title}
          </Text>
        </View>

        <View style={{ margin: 5, flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              margin: 2,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{ justifyContent: "flex-start", flexDirection: "row" }}
            >
              <Image
                source={require("../assets/images/map.png")}
                style={{ margin: 4 }}
              />
              <Text> Concert Hall </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                width: Layout.window.width * 0.4
              }}
            >
              <Image
                source={require("../assets/images/cost.png")}
                style={{ margin: 4 }}
              />
              <Text> from {item.Price} </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 2,
              justifyContent: "space-between"
            }}
          >
            <View
              style={{ justifyContent: "flex-start", flexDirection: "row" }}
            >
              <Image
                source={require("../assets/images/time.png")}
                style={{ margin: 4 }}
              />
              <Text> {moment(item.start).format("hh:mm A")}</Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                width: Layout.window.width * 0.4
              }}
            >
              <Image
                source={require("../assets/images/web.png")}
                style={{ margin: 4 }}
              />
              <Text> {item.website} </Text>
            </View>
          </View>
        </View>
        {isWishlist ? (
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 10
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                alignSelf: "center",
                marginLeft: 5
              }}
            >
              <Image source={require("../assets/images/heart.png")} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginRight: 15,
                width: Layout.window.width * 0.5
              }}
            >
              <Text style={{ alignSelf: "center", color: "#F66BCC" }}>
                {" "}
                Intreseted{" "}
              </Text>
              <Image
                source={require("../assets/images/heart_full.png")}
                style={{ margin: 4 }}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 10
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                alignSelf: "center",
                marginLeft: 5
              }}
            >
              <Image source={require("../assets/images/heart.png")} />
              {/* <Image source={require('../assets/images/heart_full.png')}  /> */}
            </View>
                <View style={{ flexDirection:'row' ,marginLeft:Layout.window.width*.2 }}>
                    {data}
                </View>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                marginRight: 5,
                // borderWidth:1
                // width: Layout.window.width * 0.5
              }}
            >
              <View>
                <LinearGradient
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#ff6cc9", "#8559f0"]}
                  style={{
                    // borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    width: 100,
                    height: 40
                  }}
                >
                  <Text style={{ alignSelf: "center" }}> You're going </Text>
                </LinearGradient>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "lightgray"
  },
  peopleLiked: {
    width: 35,
    height: 35,
    marginLeft: -15,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 28,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  peopleLikedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    position: "absolute",
  }
});
