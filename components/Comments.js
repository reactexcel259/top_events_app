import React, { Component } from "react";
import { Text, View, FlatList, Image, StyleSheet } from "react-native";
import Layout from "../constants/Layout";
import Touch from 'react-native-touch';

export default class Comments extends Component {
  _renderItem = ({ item, index }) => {
    console.log(item,'asdasd')
    let liked = item.likedBy.findIndex(val =>  val == this.props.userId )
    return (
      <View style={styles.commentWrapper}>
        <View style={styles.userDetails}>
          <Image
            style={styles.userAvatar}
            source={require("../assets/images/guide-small.png")}
          />
          <View style={styles.detailsWrapper}>
            <Text style={styles.usernameText}>
              { item && item.user_id && item.user_id.name && item.user_id.name != null && `${item.user_id.name.first} ${item.user_id.name.last} ` }
              </Text>
            <View style={styles.momentWrapper}>
              <Text style={styles.date}>13.07.2019</Text>
              <Text style={styles.date}>12:12</Text>
            </View>
          </View>
        </View>
        <View style={styles.userCommentView}>
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
        <View style={styles.sharedImageView}>
         <View
            style={[
              styles.userSharedView,
              { marginRight:  5 }
            ]}
          >
          {
            item.image &&
            <Image
              resizeMode="cover"
              style={styles.userShareImage}
              source={{uri:item.image}}
            />
          }
          </View>
        </View>
        <View style={styles.linkWrapper}>
          <View style={styles.likeView}>
            <Image source={require("../assets/images/like_full.png")} style={{height:15,width:15}} />
            <Text style={styles.totalLikeText}>{item.likedBy.length}</Text>
          </View>
          <View style={styles.TextComment}>
            <Text style={{color:'grey'}} >{item.totalComment} Comments</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.likeandcommentView}>
          <View style={styles.like}>
            <Touch
              onPress={()=>this.props.onLike(item._id)}
              >
              <View style={{flexDirection:'row',justifyContent:'center'}} >
            <View style={styles.likePng}>
              {
                liked == -1 ?
              <Image
                resizeMode="contain"
                style={styles.socialPng}
                source={require("../assets/images/like.png")}
              />
              :
              <Image
                resizeMode="contain"
                style={styles.socialPng}
                source={require("../assets/images/like_full.png")}
              />
              }
            </View>
            <Text style={styles.text}>Like</Text>
            </View>
            </Touch>
          </View>
          <View style={styles.like}>
            <View style={styles.commentPng}>
              <Image
                resizeMode="contain"
                style={styles.socialPng}
                source={require("../assets/images/comment.png")}
              />
            </View>
            <Text style={styles.text}>Comment</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          inverted
          data={this.props.userComments}
          extraData={this.props.userComments}
          keyExtractor={(item, index) => item._id}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  userAvatar: {
    width: Layout.window.width * 0.13,
    height: Layout.window.width * 0.13,
    borderRadius: 30
  },
  commentWrapper: {
    borderTopWidth: 4,
    borderColor: "#f2f2f2"
  },
  line:{
    borderColor:'#f2f2f2',
    borderWidth:1,
    height:1,
    margin:10
  },
  userDetails: {
    paddingLeft: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16
  },
  date: {
    color: "grey",
    paddingRight: 5
  },
  detailsWrapper: {
    marginLeft: 10
  },
  momentWrapper: {
    flexDirection: "row"
  },
  userCommentView: {
    paddingLeft: 10,
    paddingRight: 10,
    flexWrap: "wrap",
    marginBottom: 12
  },
  usernameText: {
    fontWeight: "700",
    fontSize: 17
  },
  commentText: {
    width: "100%"
  },
  linkWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  likeView: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 20,
    alignItems: "center"
  },
  TextComment: {
    marginRight: 10
  },
  likeandcommentView: {
    flexDirection: "row",
    marginBottom: 16
  },
  like: {
    flexDirection: "row",
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  likePng: {
    width: 20,
    height: 20
  },
  commentPng: {
    width: 20,
    height: 20
  },
  socialPng: {
    width: "100%",
    height: "100%"
  },
  text: {
    paddingLeft: 7,
    color: "grey",    
  },
  totalLikeText: {
    paddingLeft: 5
  },
  userSharedView: {
    width: Layout.window.width / 2.5,
    marginBottom: 10
  },
  userShareImage: {
    width: "100%",
    height: Layout.window.height * 0.3
  }
});
