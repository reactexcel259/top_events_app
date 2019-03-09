import React, { Component } from 'react'
import { Text, View ,FlatList,ActivityIndicator, TouchableOpacity} from 'react-native'
import Card from '../components/card';
import Touch from 'react-native-touch';
import CustomHeader from '../components/header';
import Layout from '../constants/Layout';
import {getStateAndCityRequest, 
  getCategoryRequest, 
  postJoiningEventsRequest, 
  getEventByIdRequest,
  setAddEventDefault,
  postEventLikeRequest,
  setLikeEventsDefault
} 
  from '../redux/action';
import { connect } from "react-redux";


class ViewAllCard extends Component {
    constructor(props){
      super(props)
      this.state={
        categories:[]
      }
    }
    static navigationOptions = {
        header: null
      };
    eventJoin = async (item) => {
      let token =this.props.user.user.status.token;
      let id = item._id;
      let categories = item.categories;
      this.setState({categories:categories})
      this.props.postJoiningEvent({token,id})
    }
    addTofab = (item) => {
      let token =this.props.user.user.status.token;
      let eventId = item._id;
      let categories = item.categories;
      this.setState({categories:categories})
      this.props.eventLikeRequest({token,eventId})
    }
    componentWillReceiveProps(nextProps){
      const {categories} = this.state;
      const {joinedTrue} = this.props.getInterestedEvent;
      const {isSuccess} = this.props.postAddLikeEvent
      if(nextProps.getInterestedEvent.joinedTrue  && this.props.joinedTrue !== nextProps.getInterestedEvent.joinedTrue){
        this.props.getEventById({id:categories._id,key:categories.key});
        this.props.setAddEvents();
      }
      if(nextProps.postAddLikeEvent.isSuccess && this.props.isSuccess !== nextProps.postAddLikeEvent.isSuccess){
        this.props.getEventById({id:categories._id,key:categories.key});
        this.props.setLikeEvents();
        
      }
    }
    _renderItem=({item,index})=>{
      const { user } = this.props.user;
      const check  = item.interested;
      let checkedInBy = item.checkedinBy;
      const checkInterested = check.find(going => going.email == user.data.data.email);
      const wishList = checkInterested && Object.keys(checkInterested).length ? true : false; 
      const checkedInByArray = checkedInBy.find(going => going.email == user.data.data.email);
      let going = checkedInByArray && Object.keys(checkedInByArray).length  ? true :false;
        return(
            <View>
                <TouchableOpacity 
                onPress={()=>this.props.navigation.navigate("CityEventDescription",{item:item})}
                >
                    <Card 
                      eventWishList={wishList} 
                      going={going} 
                      item={item} 
                      loading={false}
                      addTofab={(item)=>{this.addTofab(item)}}
                      eventJoin={(item)=>{this.eventJoin(item)}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
  render() {
    const {register} = this.props.getEventData;
    const {postingLoading} = this.props.getInterestedEvent
    const {isLoading} = this.props.postAddLikeEvent;
    let currentData = register.events.data !== undefined ? register.events.data.results : register.events;
    return (
      <View style={{paddingBottom:Layout.window.height*0.005, flex:1 }}>
        <CustomHeader  
          isCenter={true} 
          isLeft={true} 
          leftPress={()=>this.props.navigation.goBack()} 
          leftIcon='angle-left' 
          centerTitle="My event" 
        />
        {register.isLoading || postingLoading || isLoading ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>:
          <FlatList 
          data={currentData}
          keyExtractor={(item,index)=>(item.title)}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
          extraData={this.props}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    getEventData: state.getEvent,
    user:state.user,
    getInterestedEvent:state.getInterestedEvent,
    postAddLikeEvent: state.postAddLikeEvent,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStateAndCity:()=>dispatch(getStateAndCityRequest()),
    getCategory: () => dispatch(getCategoryRequest()),
    postJoiningEvent:(data) => dispatch(postJoiningEventsRequest(data)),
    getEventById:(eventId)=>dispatch(getEventByIdRequest(eventId)),
    setAddEvents : () => dispatch(setAddEventDefault()),
    eventLikeRequest:(token, eventId)=>dispatch(postEventLikeRequest(token ,eventId)),
    setLikeEvents:()=>dispatch(setLikeEventsDefault())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ViewAllCard);