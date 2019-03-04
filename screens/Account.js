import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  AsyncStorage,
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

class MyAccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
   
  }

  logout = async () => {
     AsyncStorage.setItem('user','');
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={{flex:1,height:Layout.window.height * 0.3,borderBottomLeftRadius:40,borderBottomRightRadius:40}} >
          <LinearGradient
            colors={['#FF6CC9','#8559F0']}
            style={{ height:Layout.window.height * 0.35 ,justifyContent:'center',borderBottomLeftRadius:40,borderBottomRightRadius:40}}
            start={[0, 0]}
            end={[1, 0]}
          >
            <View style={{alignItems:'center',marginTop:30}} >
              <Text style={{color:'white',fontSize:20,fontWeight:'600'}} > Account </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:10,marginTop:-10}} >
              <TouchableOpacity onPress={this.logout} >
                <Text style={{color:'white',fontSize:16}} > Log out </Text>
              </TouchableOpacity>
            </View>        
            <View style={{alignItems:'center',marginTop:30,marginBottom:20}} >
              <FontAwesome
              name="user-circle"
              color="white"
              size={70}
              />
            </View>
          </LinearGradient>
        </View>
       
        <View style={{flex:1}} >
       
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,borderBottomWidth:1,borderColor:'lightgray'}} >
            <View style={{ marginLeft:20, marginBottom:10, flexDirection:'row' }} >
              <Image style={{height:20,width:17}} mode='contain' source={require('../assets/images/user.png')}  />
              <Text style={{fontSize:17,marginLeft:20}} > Profile Settings </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
                <FontAwesome 
                name={'angle-right'} size={32} color="lightgray" />
            </View>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,marginBottom:15,borderBottomWidth:1,borderColor:'lightgray'}} >
            <View style={{ marginLeft:20, marginBottom:10, flexDirection:'row' }} >
              <Image style={{height:20,width:17}} mode='contain' source={require('../assets/images/settings.png')}  />
              <Text style={{fontSize:17,marginLeft:20}} > Accont settings </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
                <FontAwesome 
                name={'angle-right'} size={32} color="lightgray" />
            </View>
          </View>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:15,marginBottom:15,borderBottomWidth:1,borderColor:'lightgray'}} >
            <View style={{ marginLeft:20, marginBottom:10, flexDirection:'row' }} >
              <Image style={{height:20,width:17}} mode='contain' source={require('../assets/images/bell.png')}  />
              <Text style={{fontSize:17,marginLeft:20}} > Manage notification </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
                <FontAwesome 
                name={'angle-right'} size={32} color="lightgray" />
            </View>
          </View>
       
        </View>

        <View style={styles.miniContainer} >
            <View style={{alignItems:'center',marginTop:10}} >
              <Text style={{color:'lightgray',textAlign:'center'}} > Full Name </Text>
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
  miniContainer : {
    position:'absolute',
    height:Layout.window.height * 0.070,
    width:Layout.window.width * 0.75,
    top:Layout.window.height *0.32,
    marginLeft:50,
    backgroundColor:'white',
    borderRadius:50,
    elevation:2
  },
});

const mapStateToProps = (state) => {
  return {
      state: state,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(MyAccountScreen);