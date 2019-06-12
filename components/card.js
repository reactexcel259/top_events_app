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
    const { isWishlist ,item, favorites, eventWishList, going, loading} = this.props;
    const data = item.interested.slice(0,5).map((data, i) => {
      return (
        <View key={i} style={[styles.peopleLiked, { zIndex: image.length - i }]}>
          {
          data.image ?
          <Image
          style={styles.peopleLikedImage}
          source={{uri:data.image}}
          />
          :
          <Image
          style={styles.peopleLikedImage}
          source={require("../assets/images/photo2.png")}
          />
        }
        </View>
      );
    });
    const isPassed = moment().diff(moment(item.start),'days');
    let  eventEndDate
    if(item && item.start && item.end){
     eventEndDate = moment(item.end).format("M") > moment(item.start).format("M") ||  (parseInt(moment(item.end).format("D")) !== parseInt(moment(item.start).format("D"))+1 && parseInt(moment(item.end).format("D")) > parseInt(moment(item.start).format("D"))+1 )? moment(item.end).format("D MMM, ddd") : "";
    }
    return (
      <View
        style={{
          elevation: 5,
          flexDirection: "column",
          justifyContent: "space-evenly",
          backgroundColor: "white",
          borderRadius: 5,
          // height:isWishlist? Layout.window.height/2.0 : Layout.window.height/1.8,
          margin: 10,
          marginTop: StatusBar.currentHeight
        }}
      >
      {!isWishlist?<Text style={{paddingLeft:5,paddingTop:5,paddingBottom:5}}>
      {eventEndDate !=="" ? moment(item.start).format("D MMM, ddd")+" " : moment(item.start).format("D MMM, dddd")+" "}{eventEndDate !=="" && ("-"+" " + eventEndDate)}
      </Text>:null}
      <TouchableOpacity 
                onPress={()=>{this.props.sendToDetails(item)}}
                >
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
        </TouchableOpacity>

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
              style={{ justifyContent: "flex-start",alignItems:'center', flexDirection: "row", width:Layout.window.width * 0.4 }}
            >
              <Image
                source={require("../assets/images/map.png")}
                style={{ margin: 4,height:20,width:20 }}
              />
              <Text numberOfLines={2} style={{flexWrap:'wrap',flex:1}} > {item.EventPlace} </Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                width: Layout.window.width * 0.5,
                alignItems:'center'
              }}
            >
              <Image
                source={require("../assets/images/cost.png")}
                style={{ margin: 4,height:20,width:20 }}
              />
              <Text style={{flexWrap:'wrap',flex:1}} > from $ {item.Price} </Text>
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
              style={{ justifyContent: "flex-start", flexDirection: "row",alignItems:'center' }}
            >
              <Image
                source={require("../assets/images/time.png")}
                style={{ margin: 4,height:20,width:20 }}
              />
              <Text> {moment(item.start).format("hh:mm A")}</Text>
            </View>
            <View
              style={{
                justifyContent: "flex-start",
                flexDirection: "row",
                width: Layout.window.width * 0.5,
                alignItems:'center'
              }}
            >
              <Image
                source={require("../assets/images/web.png")}
                style={{ margin: 4,height:20,width:20 }}
              />
              <Text numberOfLines={2} style={{flex:1}} > 
              {item.website} 
              </Text>
            </View>
          </View>
        </View>
        {isWishlist ? (
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              marginTop:10,
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
              <View style={styles.peopleWrapper}>
                  <View style={styles.peppleLikedWrapper}>{data}</View>
                  <Text style={styles.totalPeople}>
                    {item.interested.length} 
                  </Text>
              </View>
            </View>
            <TouchableOpacity onPress={()=>{this.props.onWishListItemPress(item)}}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginRight: 15,
                  width: Layout.window.width * 0.3
                }}
              >
                <Text style={{ alignSelf: "center", color: "#F66BCC" }}>
                  {" "}
                  Interested{" "}
                </Text>
                <Image
                  source={require("../assets/images/heart_full.png")}
                  style={{ margin: 4,height:21,width:22 }}
                />
              </View>
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={()=>{this.props.addTofab(item)}}
              style={{
                alignSelf: "flex-start",
                alignSelf: "center",
                marginLeft: 5,
                marginTop:5,
                padding:5
              }}
            >
              {!eventWishList ? 
                <Image style={{height:20,width:22}} source={require("../assets/images/heart.png")} />
                :<Image style={{height:20,width:22}} source={require('../assets/images/heart_full.png')} />
              }
               </TouchableOpacity>
                <View style={{ flexDirection:'row' ,marginLeft:Layout.window.width*.2 }}>
                    {data}
                </View>
            <View
              style={{
                flexDirection: "row",
                marginRight: 5,
              }}
            >
              <View>
                <TouchableOpacity onPress={()=>{ isPassed < 0 && this.props.eventJoin(item)}}>
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
                      height: 35
                    }}
                  >
                    {loading?
                      <ActivityIndicator
                        size="small" 
                        color="#00ff00"
                      />
                      :
                      (going?
                      <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 20,
                        width: 98,
                        height: 33,
                        backgroundColor:'white'
                      }}>
                        <Text> You're going</Text>
                      </View>:
                      <Text style={{ alignSelf: "center", color:'white' }}>
                        {isPassed < 0 ? `Join event` : `Event Closed`}
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
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
    backgroundColor:"#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  peopleLikedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    position: "absolute",
  },
  peopleLiked: {
    width: 35,
    height: 35,
    marginLeft: -20,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 28,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  peopleLikedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    position: "absolute"
  },
  peppleLikedWrapper: {
    flexDirection: "row"
  },
  peopleWrapper: {
    flexDirection: "row",
    // width: "100%",
    paddingLeft: 20,
    marginTop: 0,
    alignItems: "center"
  },
  totalPeople: {
    marginLeft: 5,
    flexWrap:'wrap',
    flex:1
  },
});
