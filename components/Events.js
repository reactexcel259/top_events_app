import React, { Component } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacityx
} from "react-native";
const { height, width } = Dimensions.get("window");
import Touch from "react-native-touch";
import moment from 'moment';

export default class Events extends Component {

  _renderItem = ({ item, index }) => {
    let eventEndDate = moment(item.end).format("M") > moment(item.start).format("M") ||  (parseInt(moment(item.end).format("D")) !== parseInt(moment(item.start).format("D"))+1 && parseInt(moment(item.end).format("D")) > parseInt(moment(item.start).format("D"))+1 )? moment(item.end).format("D MMM") : "";
    return (
      // <React.Fragment>
      //   {(moment(item.start).format("MM") == moment().format('MM') && moment(item.start).format("D") > new Date().getDate() ) &&
      <View
        key={index}
        style={[
          styles.cardWrapper,
          {
            marginRight:
              index == this.props.eventData.results.length - 1 ? 28 : 7
          }
        ]}
      >
      <Touch  onPress={() => this.props.onEventDescription(item)}>
        <View style={styles.imageWrapper}>
          <Image
            resizeMode={"cover"}
            resizeMethod="resize"
            style={styles.cardImage}
            source={
              item.image ?
             { uri:item.image.secure_url} :require( '../assets/images/no-thumbnail.png')
            }
          />
        </View>
        <View style={styles.imageTitle}>
          <Text style={styles.nameText}>{item.title}</Text>
          <Text style={styles.dateText}>{moment(item.start).format("D MMM")+" "}{eventEndDate !=="" && ("-"+" " + eventEndDate)}</Text>
        </View>
        </Touch>
      </View>
      // }
      // </React.Fragment>
    );
  };
  findKey = (data) =>{
    let categoryId =this.props.categoryId !== 'health_wellness' ? this.props.categoryId.toUpperCase() :this.props.categoryId.toUpperCase().replace('_',' & ')
    this.props.onViewAll(data[0].categories,categoryId)
  }
  _keyExtractor=(item, index) => (item._id)
  render() {
    return (
      <React.Fragment>
        {this.props.eventData.results.length ? 
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
                {this.props.categoryId && this.props.categoryId !== 'health_wellness' ? this.props.categoryId.toUpperCase() :this.props.categoryId.toUpperCase().replace('_',' & ') }
              </Text>
              <Touch activeOpacity={0.1} onPress={() => this.findKey(this.props.eventData.results)}>
                <Text> 
                  View all{" "}
                  {this.props.eventData && this.props.eventData.results.length}
                </Text>
              </Touch>
            </View>
          </View>
          <FlatList
            style={{ paddingLeft: 15 }}
            data={this.props.eventData.results.sort(function(a,b){return new Date(a.start)-new Date(b.start)})}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            horizontal={true}
            removeClippedSubviews={false}
            // extraData={this.state.data}
            showsHorizontalScrollIndicator={false}
          />
        </View> :""}
      </React.Fragment>
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
    // fontSize: 12
  },
  dateText: {
    color: "#808080",
    fontSize: 12
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
