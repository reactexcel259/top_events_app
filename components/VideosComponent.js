import React, { Component, PureComponent } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import Index from "../Josn/Index";
import moment from "moment";
const { height, width } = Dimensions.get("window");
import Touch from 'react-native-touch';

export default class VideosComponent extends PureComponent {
  _renderItem = ({ item, index }) => {
    let image = item.image == undefined ? "" : item.image.secure_url;
    return (
      <View
        key={index}
        style={[
          styles.cardWrapper,
          {
            marginRight:
              index == this.props.cityData.data.results.length - 1 ? 23 : 7
          }
        ]}
      >
      <Touch onPress={() => this.props.onEventDescription(item)}>
        <View style={styles.imageWrapper}>
          <Image
            resizeMode={"cover"}
            style={styles.cardImage}
            source={
              item.image
                ? { uri: item.image.secure_url }
                : require("../assets/images/no-thumbnail.png")
            }
          />
        </View>
        <View style={styles.imageTitle}>
          <Text style={styles.nameText}>{item.title}</Text>
          <Text style={styles.dateText}>
            {moment(item.start).format("D MMM, dddd")}
          </Text>
        </View>
        </Touch>
      </View>
    );
  };
  render() {
    return (
      <FlatList
        style={{ paddingLeft: 15 }}
        data={this.props.cityData && this.props.cityData.data.results}
        keyExtractor={(item, index) => item.title}
        renderItem={this._renderItem}
        horizontal={true}
        removeClippedSubviews={false}
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
    height: "100%",
    borderRadius: 7
  },
  imageTitle: {},
  nameText: {},
  dateText: {
    color: "#808080"
  }
});
