import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ToastAndroid,
  Platform,
  AsyncStorage,
  Alert,
  KeyboardAvoidingView,
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
import { validateEmail } from '../services/validation';

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
      currentPassword:"",
      newEmail: '',
      loader:false,
      loaderType:'',
    }
  }

  componentDidMount() {
    const { navigation, user } = this.props
    this.setState({
      pageType: navigation.state.params.pageType
    })
    if(navigation.state.params.pageType === 'changeEmail'){
        this.setState({
          email: user.user.data.data.email
        })
      } else {
        this.setState({
          email:''
        })
      }
  }
  componentWillReceiveProps(nextProps){
    const { navigation, user } = nextProps;
    const { loaderType } = this.state;
    this.setState({
      pageType: navigation.state.params.pageType
    })
    if(user.user.passwordReset && user.user.passwordReset.success !==undefined && user.user.passwordReset.success ==false && loaderType == 'changePassword' ){
      this.setState({
        loader: false,
        loaderType:''
      })
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          user.user.passwordReset.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){
        Alert.alert(
          'Success',
          user.user.passwordReset.message,
        )
      }
    }
    else if(user.user.passwordReset && user.user.passwordReset.success !==undefined && user.user.passwordReset.success ==true  && loaderType == 'changePassword' ){
      this.setState({
        loader: false,
        newPassword:'',
        currentPassword:'',
        loaderType:''
      })
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Your password has been changed',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){
        Alert.alert(
          'Success',
          'Your password has been changed'
        )
      }
      this.goBack()
    }
    if(user.user.updateData && user.user.updateData.success && loaderType == 'changeEmail' ){
      this.setState({
        loader: false,
        newPassword:'',
        currentPassword:'',
        loaderType:''
      })
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Your Email has been changed. Please Login again',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){
        Alert.alert(
          'Success',
          'Your Email has been changed. Please Login again',
          [
            {text: 'OK', onPress: () => this.logout()},
          ],
        )
      }
    }
  }

  logout = async () => {
      let keys = ['user','user_info','user_interest'];
      let a = await AsyncStorage.multiRemove(keys);
      this.props.navigation.popToTop();
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
    } else if ( field == 'currentPassword' ) {
      this.setState({
        currentPassword: text
      })
    } else if (field == 'newEmail' ){
      this.setState({
        newEmail: text
      })
    }
  }

  onPress = () => {
    const { pageType, email, newEmail, currentPassword, newPassword } = this.state;
    const { user } = this.props;
    let token = user.user.status.token;
    let id = user.user.data.data._id
    let payload;
    if(pageType == 'resetPassword'){
      if(email == '' || !validateEmail(email) ){
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Please Enter Your Register Email',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'Please Enter Your Register Email'
          )
        }
      } else {
        payload = {
          email
        }
        this.props.userForgetPasswordRequest(payload)
        this.goBack()
      }
    } else if (pageType == 'changePassword'){
      if( newPassword == '' || currentPassword == '' ){
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Please Enter Password',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'Please Enter Password'
          )
        }
      } else if(newPassword.length < 8  ){
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'New password must be of 8 characters long',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'New password must be of 8 characters long'
          )
        }
      }else if(newPassword.length == 8 || newPassword.length > 8 ){
        payload = {
          token,
          password: newPassword,
          currentPassword: currentPassword
        }
        this.setState({
          loader:true,
          loaderType:'changePassword'
        })
        this.props.userPasswordRequest(payload);
      }
       else {
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Password and confirm password is not match',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'Password and confirm password is not match'
          )
        }
      }
    } else if(pageType == 'changeEmail'){
      if(newEmail == '' || !validateEmail(newEmail)){
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Please Enter Your Register Email',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'Please Enter Your Register Email'
          )
        }
      } else {
        payload = {
          id,
          token,
          data:{
            email: newEmail
          }
        }
        this.setState({
          loader:true,
          loaderType:'changeEmail'
        })
        this.props.userDataRequest(payload)
      }
    }
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
    const { pageType ,email, newPassword, confirmPassword, currentPassword,loader } = this.state;
    let pageTitle;
    let buttonTitle;
    if(pageType == 'changePassword'){
      pageTitle = 'Change Password';
      buttonTitle = 'Submit'
    } else if (pageType == 'resetPassword'){
      pageTitle = 'Reset Password';
      buttonTitle = 'Send'
    } else if(pageType == 'changeEmail') {
      pageTitle = 'Updated e-mail address';
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

          {
            loader ?
            <ActivityIndicator
               size="large" 
               color="white" 
                style={styles.activityIndicator}
              />
              :
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
              currentPassword={currentPassword}
              onChange={this.onChange}
              userPasswordDetail={this.props.user}
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
          }
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
  activityIndicator:{
    marginTop:Layout.window.height * 0.3
  }
});

const mapStateToProps = (state) => {
  return {
      user: state.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(ChangePassword);
    
