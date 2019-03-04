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
import CustomeButton from '../components/button';
import Account from '../components/manageAccount/account';

class ChangePassword extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
    this.state={
      pageType:'',
      email:'',
      newPassword:'',
      confirmPassword:'',
      newEmail: ''
    }
  }

  componentWillMount() {
    const { navigation } = this.props
    this.setState({
      pageType: navigation.state.params.pageType
    })
  }
  componentWillReceiveProps(nextProps){
    const { navigation } = this.props
    this.setState({
      pageType: navigation.state.params.pageType
    })
  }

  onChange = (text,field) => {
    if(field == 'email'){
      this.setState({
        email: text
      })
    } else if( field == 'newPassword' ){
      this.setState({
        newPassword: text
      })
    } else if ( field == 'confirmPassword' ) {
      this.setState({
        confirmPassword: text
      })
    } else if (field == 'newEmail' ){
      this.setState({
        newEmail: text
      })
    }
  }

  onPress = () => {

  }

  goBack = () => {
    const { navigation } = this.props;
    const { pageType } = this.state;
    if(pageType == 'resetPassword'){
      navigation.setParams({pageType:'changePassword'})
    } else {
      navigation.goBack();
    }
  }

  render() {
    const { pageType ,email, newPassword, confirmPassword } = this.state;
    let pageTitle;
    let buttonTitle;
    if(pageType == 'changePassword'){
      pageTitle = 'Change Password';
      buttonTitle = 'Submit'
    } else if (pageType == 'resetPassword'){
      pageTitle = 'Reset Password';
      buttonTitle = 'Send'
    } else if(pageType == 'changeEmail') {
      pageTitle = 'Updated e-mail password';
      buttonTitle = 'Submit'
    }
    return (
      <View style={styles.mainContainer}>
        <LinearGradient
          colors={["#FF6CC9","#8559F0"]}
          style={{ flex: 1,justifyContent:'center' }}
          start={[1, 0]}
          end={[0, 1]}
        >
          <View style={{flex:1,marginTop:20}} >
            <TouchableOpacity onPress={this.goBack} >
            <View style={{alignItems:'flex-end',marginTop:30,marginRight:20}} >
              <Text style={{color:'white'}} > Cancel </Text> 
            </View>
            </TouchableOpacity>
            
            <View style={{alignItems:'center',margin:30}} >
              {
                pageType == 'changeEmail' ?
                <Image mode={"contain"} source={require('../assets/images/email_white.png')} style={{height:60,width:60}} />                
                :
                <Image mode={"contain"} source={require('../assets/images/lock_white.png')} style={{height:60,width:50}} />
              }
            </View>

            <Account
              type={pageType}
              title={pageTitle}
              buttonText={buttonTitle}
              buttonPress={this.onPress}
              email={email}
              newPassword={newPassword}
              confirmPassword={confirmPassword}
              onChange={this.onChange}
            />
            <View style={{marginBottom:50,marginTop:25}} >
            {
              pageType == 'changePassword' &&
              <TouchableOpacity onPress={()=>{ 
                this.props.navigation.setParams({pageType:'resetPassword'})
               }} >
                <Text style={{color:'white',textAlign:'center'}} > Reset Password </Text>
              </TouchableOpacity>
            }
            </View>
          
          </View>
        </LinearGradient>
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
      state: state,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);
    
