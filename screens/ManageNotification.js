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

class ManageNotificationScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
    this.state={
      events: true,
      notifications: false,
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    this.props.navigation.goBack();
  }

  onSwitch = (val) => {
    if(val == 'notification') {
      this.setState({
        notification: !this.state.notification
      })
    } else if ( val == 'event' ) {
      this.setState({
        events: !this.state.events
      })
    }
  }

  render() {
    const { events, notification } = this.state;
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isLeft
          leftIcon={'angle-left'}
          leftPress={this.goBack}
          isCenter={true}
          centerTitle={'Manage notifications'}
        />    

        <View style={{flex:1,marginTop:20}} >
          
        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15}} >
            <View style={{ marginLeft:10, marginBottom:10, flexDirection:'row' }} >
              <Text style={{fontSize:17,marginLeft:20}} > Receive Top Events Jamaica </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
              <TouchableOpacity onPress={() => this.onSwitch('event') } >
                {
                  events ?
                    <Image style={{height:20,width:35}} mode='contain' source={require('../assets/images/switcher_on.png')}  />
                  :
                   <Image style={{height:20,width:35}} mode='contain' source={require('../assets/images/switcher_off.png')}  />
                }
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,}} >
            <View style={{ marginLeft:10, marginBottom:10, flexDirection:'row' }} >
              <Text style={{fontSize:17,marginLeft:20}} > Push Notifications </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
            <TouchableOpacity onPress={() => this.onSwitch('notification') } >
                {
                  notification ?
                    <Image style={{height:20,width:35}} mode='contain' source={require('../assets/images/switcher_on.png')}  />
                  :
                   <Image style={{height:20,width:35}} mode='contain' source={require('../assets/images/switcher_off.png')}  />
                }
              </TouchableOpacity>
            </View>
          </View>

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
});

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(ManageNotificationScreen);
    
