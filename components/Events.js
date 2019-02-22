import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image
} from "react-native";
const { height, width } = Dimensions.get("window");

export default class Events extends Component {
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
      <View style={styles.flatView}>
        <View style={styles.eventSectionName}>
            <View style={[styles.circle,{backgroundColor:this.props.backgroundColor}]}></View>
            <View style={styles.eventHeaderText}>
                <Text style={styles.eventSectionText}>
                    {this.props.eventSectionName}
                </Text>
                <Text>View all 12</Text>
            </View>
        </View>
        <FlatList
          style={{ paddingLeft: 15 }}
          data={this.props.eventData}
          keyExtractor={(item, Index) => item}
          renderItem={this._renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardWrapper: {
    width: width * 0.35,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginRight: 7
  },
  imageWrapper: {
    width: "100%",
    height: height * 0.18,
},
cardImage: {
    borderRadius:10,
    width: "100%",
    height: "100%"
  },
  imageTitle: {},
  nameText: {
    fontSize: 12
  },
  dateText: {
    color: "#808080"
  },
  flatView: {
    paddingTop: height * 0.05,
  },
  eventSectionName: {
    paddingLeft: 25,
    height:height*.05,
  },
  eventSectionText: {
    fontWeight: "500",
    marginTop:5,
    marginLeft:4
  },
  circle:{
      width:width*.09,
      height:height*.05,
      position:"absolute",
      zIndex:0,
      borderRadius:height*.2,
      left:15
  },
  eventHeaderText:{
      flexDirection:'row',
      justifyContent:'space-between',
      paddingRight:15
  }
});
