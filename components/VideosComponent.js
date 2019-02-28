import React, { Component,PureComponent } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
import Index from "../Josn/Index";
const { height, width } = Dimensions.get("window");

export default class VideosComponent extends PureComponent {
  _renderItem = ({item,index}) => {
    console.log(item ,'&&&&&&&&&&&&&&&&&&&&&&');
    let image =item.image ==undefined ? '' : item.image.secure_url
    return (
      <View key={index} style={[styles.cardWrapper,{marginRight:index ==this.props.cityData.data.results.length-1 ? 23 : 7}]}>
        <View style={styles.imageWrapper}>
          <Image
            resizeMode={"cover"}
            style={styles.cardImage}
            source={{uri:image}}
          />
        </View>
        <View style={styles.imageTitle}>
          <Text style={styles.nameText}>{item.title}</Text>
          <Text style={styles.dateText}>{item.start}</Text>
        </View>
      </View>
    );
  };
  render() {    
    return (
      <FlatList
        style={{ paddingLeft: 15 }}
        data={this.props.cityData && this.props.cityData.data.results}
        keyExtractor={(item, index) => (item.title)}
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
    justifyContent: "flex-start",
  },
  imageWrapper: {
    width: "100%",
    height: height * 0.18,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius:7
  },
  imageTitle: {},
  nameText: {},
  dateText: {
    color: "#808080"
  }
});
