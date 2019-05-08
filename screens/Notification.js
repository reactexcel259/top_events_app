import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Layout from "../constants/Layout";
import { LinearGradient, Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import * as actions from '../redux/action';
import CustomHeader from '../components/header';
import moment from 'moment'

class Notifications extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
    this.state = {
      notificationList:[]
    }
  }

  componentWillMount() {
    const { user } = this.props;
    let payload = {
      token: user.status.token
    }
    this.props.getNotificationRequest(payload)
  }

  componentWillReceiveProps(nextProps){
    const { notification } = nextProps;
    if(notification.isSuccess){
      this.setState({
        notificationList:notification.status
      })
    }
  }

  render() {
    const { notification } = this.props;
    const { notificationList } = this.state;
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isCenter={true}
          centerTitle={'Notifications'}
        />    

        <View style={{flex:1,margin:20}} >
         {
           notification.isLoading ? 
           (
            <View style={styles.loaderView}>
              <ActivityIndicator color="#FF6CC9" size="large" />
            </View>
          )
          :
            <FlatList
            // inverted     
            data={notificationList.reverse()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              let time = moment().diff(moment(item.createdAt),'days');
              if(item.event_id){
              return (
              <View style={{flexDirection:'row',borderBottomWidth: 1, borderColor:"#efefef",alignItems:"center"}} >
                <View style={{width:Layout.window.width * 0.25}} >
                  {
                    item.event_id && item.event_id.image ?
                  <Image source={{uri:item.event_id.image.url}} style={{height:60,width:60,borderRadius:5}} />
                  :
                  <Image source={require('../assets/images/logo.png')} style={{height:60,width:60,borderRadius:5}} />
                  }
                </View>
                <View style={{flexDirection:'column',justifyContent:'space-between',marginVertical:15,flexWrap:'wrap',width:Layout.window.width * 0.62}} >
                  <View style={{flexWrap:'wrap',flex:1,}} >
                   {item.notificationType === "newEvent" && 
                   (
                      <Text>
                        {item.message} 
                        <Text style={{fontWeight:'600'}} > {item.event_id.title} </Text>
                      </Text>
                    )}
                    {item.notificationType === "upcomingEvent" && 
                    (
                      <Text>                          
                          <Text style={{fontWeight:'600'}} > {item.event_id.title} </Text>
                          {item.message} 
                      </Text>
                    )}
                     {item.notificationType === "like" && 
                    (
                      <Text>                          
                          <Text style={{fontWeight:'600'}} > {item.otherUsers} </Text>
                          {item.message} in
                          <Text style={{fontWeight:'600'}} > {`${item.event_id.title}`} </Text>

                      </Text>
                    )}
                  </View>
                  <View>
                    <Text style={{color:"darkgray"}} >
                    {
                      time == 0 && `Today`
                    }
                    {
                      time >0 && time < 7 && `${time} days ago`
                    }
                    {
                      time > 7  && `Last week`
                    }
                    </Text>
                  </View>
                </View>
              </View>  
            )
            } 
            }}
          />
         }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white'
  },
  loaderView: {
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    top: Layout.window.height * 0.4
  }
});

const mapStateToProps = (state) => {
  return {
      notification: state.notification,
      user: state.user.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
    
