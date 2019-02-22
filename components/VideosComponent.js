import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import image from "../assets/images/jakeoff.png";
import Index from "../Josn/Index";
const { height, width } = Dimensions.get("window");
const kingstonData = [
  {
    image: "../assets/images/jakeoff.png",
    date: "8 Dec ,Friday",
    name: "Jake's off road triation"
  },
  {
    image: "../assets/images/jamaica.png",
    date: "7 Dec ,Friday",
    name: "Jamaica Dream day"
  }
];

export default class VideosComponent extends Component {
  _renderItem = item => {
    return (
      <View style={styles.cardWrapper}>
        <View style={styles.imageWrapper}>
          <Image
            resizeMode={"cover"}
            style={styles.cardImage}
            source={require("../assets/images/photo-jake.png")}
          />
        </View>
        <View style={styles.imageTitle}>
          <Text style={styles.nameText}>{item.item.name}</Text>
          <Text style={styles.dateText}>{item.item.date}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <FlatList
        style={{ paddingLeft: 10 }}
        data={kingstonData}
        keyExtractor={(item, Index) => item}
        renderItem={this._renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    );
  }
}
const styles = StyleSheet.create({
  cardWrapper: {
    width: width * 0.6,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  imageWrapper: {
    width: "100%",
    height: height * 0.18
  },
  cardImage: {
    width: "100%",
    height: "100%"
  },
  imageTitle: {},
  nameText: {},
  dateText: {
    color: "#808080"
  }
});
