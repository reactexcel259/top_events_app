import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import Touch from 'react-native-touch';
import { bindActionCreators } from "redux";
import Layout from "../../constants/Layout";
import { LinearGradient, Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import * as actions from '../../redux/action';
import Card from '../../components/card';
import {
  getAttendingEventRequest,
  getEventByIdRequest,
  setAddEventDefault,
  postEventLikeRequest,
  setLikeEventsDefault,
  postJoiningEventsRequest
} from '../../redux/action';
import { withNavigationFocus } from 'react-navigation';

class Attending extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attendingEvents:[],
      categories:[]
    }
   
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  async componentDidMount(){
    let token =this.props.user.user.status.token
    await this.props.getAttendingEventRequest(token)
  }
  
  async componentWillReceiveProps(nextProps){
    const {attending,isLoading,joinedTrue} = this.props.getInterestedEvent
    const {categories} = this.state;
    const {isSuccess} = this.props.postAddLikeEvent
    if(nextProps.getInterestedEvent.attending.data !== undefined){
      if(nextProps.getInterestedEvent.attending !== attending){
        this.setState({attendingEvents:nextProps.getInterestedEvent.attending.data.results})
      }    
    }
    if(nextProps.getInterestedEvent.joinedTrue  && this.props.joinedTrue !== nextProps.getInterestedEvent.joinedTrue){
      let token =this.props.user.user.status.token
      await this.props.getAttendingEventRequest(token)
      this.props.setAddEventDefault();
    }
    if(nextProps.postAddLikeEvent.isSuccess && this.props.isSuccess !== nextProps.postAddLikeEvent.isSuccess){
      let token =this.props.user.user.status.token
      await this.props.getAttendingEventRequest(token)
      this.props.setLikeEventsDefault();
    }
  }

  async componentDidUpdate(prevProps){
    if(prevProps.isFocused !== this.props.isFocused){
      
    }
  }
  eventJoin = (item) => {
    let token =this.props.user.user.status.token;
    let id = item._id;
    let categories = item.categories;
    this.setState({categories:categories})
    this.props.postJoiningEventsRequest({token,id})
  }
  addTofab = (item) => {
    let token =this.props.user.user.status.token;
    let eventId = item._id;
    let categories = item.categories;
    this.setState({categories:categories})
    this.props.postEventLikeRequest({token,eventId})
  }
  _renderItem=({item,index})=>{
    const { user } = this.props.user;
    const check  = item.interested;
    const checkInterested = check.find(going => going.email == user.data.data.email);
    const wishList = checkInterested && Object.keys(checkInterested).length ? true : false; 
    return(
        <View>
            <Touch 
            activeOpacity={0.05}
            onPress={()=>this.props.navigation.navigate("CityEventDescription",{item:item})}
            >
                <Card 
                  item={item} 
                  going={true} 
                  eventWishList={wishList} 
                  addTofab={(item)=>{this.addTofab(item)}}
                  eventJoin={(item)=>{this.eventJoin(item)}}
                />
            </Touch> 

        </View>
    )
  }
  

  render() {
    const {status,attendingLoading, postingLoading} = this.props.getInterestedEvent
    const {attendingEvents} = this.state;
    const {isLoading} = this.props.postAddLikeEvent;
    return (
      <View style={styles.mainContainer}>
        {
          attendingLoading || postingLoading || isLoading ?
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>:
          <View style={styles.mainContainer} >
            {attendingEvents.length?<FlatList 
            data={this.state.attendingEvents}
            keyExtractor={(item,index)=>(index.toString())}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
            />:
            <View style={styles.suggestion}>
                <Text>
                  Your are not attending any event yet !!
                </Text>
            </View>
            }
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white'
  },
  suggestion:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  loaderStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

const mapStateToProps = (state) => {
  return {
      getInterestedEvent:state.getInterestedEvent,
      user:state.user,
      getInterestedEvent:state.getInterestedEvent,
      postAddLikeEvent: state.postAddLikeEvent,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(Attending));
    
