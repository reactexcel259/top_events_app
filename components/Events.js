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
  constructor(props){
    super(props);
      this.state={data :this.props.eventData && this.props.eventData.results}
    
  }
  _renderItem = ({ item, index }) => {
    return (
      <View
        kye={index}
        style={[
          styles.cardWrapper,
          {
            marginRight:
              index == this.props.eventData.results.length - 1 ? 28 : 7
          }
        ]}
      >
        <View style={styles.imageWrapper}>
          <Image
            resizeMode={"cover"}
            style={styles.cardImage}
            source={{
              uri: item !== undefined && item.image && item.image.secure_url
            }}
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
      <View style={styles.flatView}>
        <View style={styles.eventSectionName}>
          <View
            style={[
              styles.circle,
              { backgroundColor: this.props.backgroundColor }
            ]}
          />
          <View style={styles.eventHeaderText}>
            <Text style={styles.eventSectionText}>
              {this.props.categoryId && this.props.categoryId.toUpperCase()}
            </Text>
            <Text>
              View all {this.props.eventData && this.props.eventData.results.length}
            </Text>
          </View>
        </View>
        <FlatList
          style={{ paddingLeft: 15,}}
          data={this.props.eventData.results}
          keyExtractor={(item, index) => (item, index)}
          renderItem={this._renderItem}
          horizontal={true}
          extraData={this.state.data}
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
    justifyContent: "flex-start"
  },
  imageWrapper: {
    width: "100%",
    height: height * 0.18
  },
  cardImage: {
    borderRadius: 10,
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
    paddingTop: height * 0.05
  },
  eventSectionName: {
    paddingLeft: 25,
    height: height * 0.05,
    marginBottom: 7
  },
  eventSectionText: {
    fontWeight: "500",
    marginTop: 5,
    marginLeft: 4
  },
  circle: {
    width: width * 0.09,
    height: height * 0.05,
    position: "absolute",
    zIndex: 0,
    borderRadius: height * 0.2,
    left: 15
  },
  eventHeaderText: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15
  }
});
