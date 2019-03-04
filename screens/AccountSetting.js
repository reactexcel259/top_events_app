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

class AccountSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
   
  }

  goBack = () => {
    const { navigation } = this.props;
    this.props.navigation.goBack();    
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isLeft
          leftIcon={'angle-left'}
          leftPress={this.goBack}
          isCenter={true}
          centerTitle={'Account settings'}
        />    

        <View style={{flex:1,marginTop:20}} >
        <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('ChangePassword',{pageType: 'changeEmail'})
          }} >          
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,borderBottomWidth:1,borderColor:'lightgray'}} >
            <View style={{ marginLeft:20, marginBottom:10, flexDirection:'row' }} >
              <Image style={{height:20,width:20}} mode='contain' source={require('../assets/images/email.png')}  />
              <Text style={{fontSize:17,marginLeft:20}} > Update e-mail address </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
                <FontAwesome 
                name={'angle-right'} size={32} color="lightgray" />
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('ChangePassword',{pageType: 'changePassword'})
          }} >
          <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,borderBottomWidth:1,borderColor:'lightgray'}} >
            <View style={{ marginLeft:20, marginBottom:10, flexDirection:'row' }} >
              <Image style={{height:20,width:16}} mode='contain' source={require('../assets/images/password.png')}  />
              <Text style={{fontSize:17,marginLeft:20}} > Change password </Text>
            </View>
            <View style={{alignItems:'flex-end',marginRight:20,justifyContent:'center'}} >
                <FontAwesome 
                name={'angle-right'} size={32} color="lightgray" />
            </View>
          </View>
          </TouchableOpacity>

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

export default connect(mapStateToProps,mapDispatchToProps)(AccountSettingScreen);
    
