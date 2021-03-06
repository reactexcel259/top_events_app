import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
  Alert,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { WebBrowser, LinearGradient,AppAuth, AuthSession } from 'expo';
// import * as AppAuth from 'expo-app-auth';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../redux/action';
import { Facebook, Google,GoogleSignIn} from 'expo';
import Expo from 'expo';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
import LoginContainer from '../components/signup/login';
import SignUpContainer from '../components/signup/signup';
import DetailsContainer from '../components/signup/details';
import WelcomeContainer from '../components/signup/welcome';
import {setItem, getItem} from '../services/storage';
import { validateEmail } from '../services/validation';

const RCTNetworkingNative = require('NativeModules').Networking;
// const timer = require('react-native-timer');

class SignUpScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props){
    super(props);
    this.state = {
      progress: 1,
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      login:false,
      loader: false,
      interest: [],
      emailForPassword:"",
      isForgotPassword:false,
      isCacheCleared:undefined,
      isSignedInAsync:false,
      isGooglePress:false,
      isGoogleRequest:false
    }
  }

  async componentWillMount() {
    const { navigation } = this.props;
    // RCTNetworkingNative.clearCookies(isCacheCleared=>{
    //   this.setState({isCacheCleared})
    // })
    if( navigation.state.params && navigation.state.params.isLogin){
      this.setState({
        login: true
      })
    } else {
      this.setState({
        login:false
      })
    }
    const { interest } = this.state;
    if(interest.length == 0 ) {
      let interestList = await getItem('user_interest');
        if(interestList && interestList.interest){
          this.setState({
            interest: interestList.interest
          })
        }
    }
  }

  recoverForgotPassword=()=>{
    const {emailForPassword} = this.state;
    if(emailForPassword != '' && validateEmail(emailForPassword) ){
      this.props.forgotPasswordRequest(emailForPassword)
    } else if ( !validateEmail(emailForPassword) ) {
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Enter Correct Email ID',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){ 
        Alert.alert(
          'Warning!',
          'Enter Correct Email ID'
        )
      }
    }
    else if (emailForPassword === '' ) {
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Enter Your Email ID',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){ 
        Alert.alert(
          'Warning!',
          'Enter Your Email ID'
        )
      }
    }
  }

  componentDidUpdate(preProps){
    const {user,forgotPasswordData} =this.props;
    const { login } = this.state;
    if(user.user.isSuccess !==preProps.user.user.isSuccess){
      if(user.user.status && user.user.status.message && user.user.status.message ==="Incorrect email or password" ){
        if(Platform.OS == 'android') {
              ToastAndroid.showWithGravityAndOffset(
                login &&  user.user.status.message ,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
              );
              this.setState({
                email:'',
                password:'',
              })
            } else if( Platform.OS == 'ios'){
              Alert.alert(
                'Congrats!',
                login &&  user.user.status.message
              )
              this.setState({
                email:'',
                password:'',
              })
            }
      }
    } 
    if(user.user.isError !==preProps.user.user.isError){
      if(user.user.isError){
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          login ?  user.user.status.message : "Email is already exist",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        this.setState({
          email:'',
          password:'',
        })
      } else if( Platform.OS == 'ios'){
        Alert.alert(
          'Congrats!',
          login ?  user.user.status.message : "Email is already exist",
        )
        this.setState({
          email:'',
          password:'',
        })
      }
    }
    }
    if(forgotPasswordData.isSuccess !==preProps.forgotPasswordData.isSuccess){
      if(forgotPasswordData.isSuccess && forgotPasswordData.data && forgotPasswordData.data.message){
        this.setState({emailForPassword:"",isForgotPassword:false})
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            forgotPasswordData.data.message,
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Congrats!',
            forgotPasswordData.data.message,
          )
        }
      }
    }
   
    // if(this.state.isGooglePress){
    //   timer.setInterval(this, "hideMsg", async()=>{
    //     const  getCurrentUser  =  await GoogleSignIn.getCurrentUser()
    //     console.log(getCurrentUser,'getCurrentUserupper');
    //     if(getCurrentUser){
    //       timer.clearInterval(this);
    //       this.setState({isGooglePress:false});
    //       console.log(getCurrentUser,"getCurrentUserdown",',,,,,,,,,,,,');
    //       let payload = {
    //         email: getCurrentUser.email,
    //         name : getCurrentUser.displayName
    //       }
    //       this.props.getSocialLoginRequest(payload)
    //     }else{
    //       timer.clearInterval(this);
    //       this.setState({isGooglePress:false});
    //        this.googleLogin()
    //     }
    //   }, 2000)
    // }
  }

  forgotPasswordStateHandler=()=>{
    this.setState({isForgotPassword:!this.state.isForgotPassword})
  }

  componentWillReceiveProps(nextProps){
    const { login } = this.state;
    if(nextProps.user.user.isSuccess && nextProps.user.user.status.session){
      this.setState({
        loader:false,
        email:'',
        password:'',
        firstName:'',
        lastName:'',
      })
      this.props.closeSuccessModel()
      if(this.state.progress != 3 && !login){
        this.props.navigation.navigate('HomeTab')
      } else if(login){
        this.props.navigation.navigate('HomeTab')        
      }
    } /* else if(nextProps.user.user.isError){
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          login ? 'Login Failed' : 'This email id is already registered.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        this.setState({
          email:'',
          password:'',
        })
      } else if( Platform.OS == 'ios'){
        Alert.alert(
          'Congrats!',
          login ? 'Login Failed' : 'This email id is already registered.'
        )
        this.setState({
          email:'',
          password:'',
        })
      }
    }  */
  }

  changeProgress = () => {
    const { progress, firstName, lastName, email, password, interest } = this.state;    
    if(progress ==1 ){
      if( firstName != '' && lastName != '' ) {
        this.setState({ progress: progress +1 })
      } else {
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Please fill all fields',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'Please fill all fields'
          )
        }
      }
    } else if (progress == 2) {
      if(email != '' && password != '' && validateEmail(email) ){
        let payload = {
          name: {
            first: firstName,
            last: lastName 
          },
          email: email,
          password: password,
          interests: interest
        }
        this.setState({ loader: true })
        this.props.getRegisterRequest(payload)
      } else {
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Please fill all fields',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){
          Alert.alert(
            'Warning!',
            'Please fill all fields'
          )
        }
      }
    } else if(progress == 3) {
      // this.props.navigation.navigate('HomeTab')
    }
  }


  textChange = (text,field) => {
    if(field == 'firstname'){
      this.setState({firstName:text})
    } else if(field == 'lastname'){
      this.setState({lastName:text})
    } else if(field == 'email'){
      this.setState({email:text})
    } else if(field == 'password'){
      this.setState({password:text})
    }
  }

  laterPress = () => {
    const { login, progress } = this.state;
    if(login){
      this.setState({ login: false })
    } else if(progress == 2) {
      this.setState({ progress: 1 })
    }
  }

  login = () => {
    const { email, password } = this.state;
    if(email != '' && password != '' && validateEmail(email) ){
      let payload = {
        email,
        password
      }
      this.setState({ loader: true })      
      this.props.getLoginRequest(payload)
    } else if ( !validateEmail(email) ) {
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Enter Correct Email ID',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){ 
        Alert.alert(
          'Warning!',
          'Enter Correct Email ID'
        )
      }
    }
  }

  renderProgress = () => {
    const { progress, firstName, lastName, email, password, login } = this.state;    
    if( progress == 1) {
      return(
        <SignUpContainer
          socialLogin={this.socialLogin}
          googleLogin={this.googleLogin}           
          onPress={this.changeProgress}
          firstName={firstName}
          lastName={lastName}
          onChange={this.textChange}
        />
      )
    } else if (progress == 2) {
      return(
        <DetailsContainer 
          email={email}
          password={password}
          onChange={this.textChange}
          onPress={this.changeProgress}
        />
      )
    } else if (progress == 3) {
      return(
        <WelcomeContainer
          onPress={this.changeProgress}
        />
      )
    }
  }

  googleLogin = async () => {
    // try {
    //  const initAsync=   await GoogleSignIn.initAsync({ clientId:'1021914779636-a1g05af12bnebg20pcnvgr00ldvvco7k.apps.googleusercontent.com' });
    //   console.log(initAsync,'initAsync');
    //   if(initAsync){
    //       await GoogleSignIn.askForPlayServicesAsync();
    //       const { type, user } = await GoogleSignIn.signInAsync();
    //       if (type === 'success') {
    //         console.log(type, user,'type, user');
    //         let payload = {
    //                   email: user.email,
    //                   name : user.displayName
    //                 }
    //                this.props.getSocialLoginRequest(payload)
            
    //         // ...
    //       }
    //   }
      
    // } catch ({ message }) {
    //   alert("error" + message);
    // const config = {
    //   issuer: 'https://accounts.google.com',
    //   clientId: '1021914779636-a1g05af12bnebg20pcnvgr00ldvvco7k.apps.googleusercontent.com',
    //   scopes: ['profile'],
    // };
    
    // const tokenResponse = await AppAuth.authAsync(config);

    // console.log(tokenResponse,'tokenResponse');
    
    // }
    console.log(`${AppAuth.OAuthRedirect}:/oauth2redirect/google`);
    this.setState({isGoogleRequest:true})
    try {
      const result = await Google.logInAsync({
        behavior:"system",
        androidClientId:"1021914779636-a1g05af12bnebg20pcnvgr00ldvvco7k.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
        redirectUrl:`${AppAuth.OAuthRedirect}:/oauth2redirect/google`
      });
      console.log(result);
      if(result && result.user) {
       await setItem("accessToken", JSON.stringify({accessToken:result.accessToken}));
        this.setState({isGoogleRequest:false})
          let payload = {
            email: result.user.email,
            name : result.user.name
          }
         this.props.getSocialLoginRequest(payload)
        }else{
          this.setState({isGoogleRequest:false})
          Alert.alert(
            'Opps!',
            `Something went wrong or it seems like you closed the login page ${AppAuth.OAuthRedirect}`
          )
        }
    } catch(e) {
      console.log({e});
      this.setState({isGoogleRequest:false})
      Alert.alert(
        'Opps!',
        `There is google server problem with login, reopen your app and try again. + ${AppAuth.OAuthRedirect}`
      )
    }
  }

  signOutAsync = async () => {
    try {
      await GoogleSignIn.signOutAsync();
      this.setState({ user: null });
    } catch ({ message }) {
      alert('signOutAsync: ' + message);
    }
  };

  

  socialLogin = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2276411582616111', {
        permissions: ['public_profile', 'email'],
        behavior: 'browser',
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`).then(data => data.json()).then(res => {
          return res;
        })
        let payload = {
          email: response.email,
          name : response.name
        }
        this.props.getSocialLoginRequest(payload)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      console.log(`Facebook Login Error: ${message}`);
    }
  }

  backPress = () => {
    if(this.state.isForgotPassword){
      this.setState({isForgotPassword:false})
    }
    else{
    const { navigation } = this.props;
    if ( navigation.state.params && navigation.state.params.isLogin ){
      navigation.popToTop()
    } else {
      this.setState({ login: false })
    }
  }
  }
  signupPress=async()=>{
        this.setState({ login: false ,isForgotPassword:false})
  }
  render() {
    // console.log(this.state.isCacheCleared,'isCacheCleared');
    
    const { progress, firstName, lastName, email, password, login,isForgotPassword,isGooglePress,isGoogleRequest } = this.state;
    const { user,forgotPasswordData } = this.props;
    console.log(AppAuth,'GoogleSignIn');
    
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#FF6CC9','#8559F0']}
          style={{ flex: 1 }}
          start={[0, 0]}
          end={[1, 0]}
        >
        
        <View style={{flex:1,flexDirection:'column',justifyContent:'space-between'}} >
          <View>
            <Image
              source={require('../assets/images/Top_Events_Login_screen_option-2.png')}
              style={styles.image}
            />
          </View>

          <View style={{alignItems:'center',marginBottom:20}} >
              {
                progress == 1 && !login &&
                <TouchableOpacity onPress={()=>{ this.setState({login:true}) }} >
                  <Text style={{color:'white',fontSize:17}} > Sign in </Text>
                </TouchableOpacity>
              }
              {
                progress == 1 && login &&
                <TouchableOpacity onPress={this.signupPress} >
                  <Text style={{color:'white',fontSize:17}} > Sign up </Text>
                </TouchableOpacity>
              }
              {/* {
                progress == 2  &&
                <TouchableOpacity onPress={this.laterPress} >
                  <Text style={{color:'white',fontSize:17}} > Do it later </Text>
                </TouchableOpacity>
              } */}
          </View>
        </View>
          <View style={styles.miniContainer} >
          { user.user.isLoading || forgotPasswordData.isLoading ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <ActivityIndicator size="large" color="black" animating={user.user.isLoading || forgotPasswordData.isLoading} />
          </View>
          :
            login ?
             <LoginContainer
              socialLogin={this.socialLogin}
              onPress={this.login}
              email={email}
              googleLogin={this.googleLogin}
              iconPress={this.backPress}
              password={password}
              onChange={this.textChange}
              onChangeForPassword={(emailForPassword)=>this.setState({emailForPassword})}
              emailForPassword={this.state.emailForPassword}
              onPressForgotPassword={this.recoverForgotPassword}
              isForgotPassword={isForgotPassword}
              forgotPasswordStateHandler={this.forgotPasswordStateHandler}
              isGoogleRequest={isGoogleRequest}
            /> 
          :
            this.renderProgress()
        }
          {/* <Text onPress={this.signOutAsync}>Logout</Text> */}
          </View>
        </LinearGradient>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  image :{
    height: Layout.window.height * 0.7,
    width: Layout.window.width
  },
  miniContainer : {
    position:'absolute',
    height:Layout.window.height * 0.54,
    width:Layout.window.width * 0.95,
    top:Layout.window.height * 0.36,
    marginLeft:10,
    backgroundColor:'white',
    borderRadius:10,
    elevation:2
  },
});


const mapStateToProps = (state) => {
  return {
      user: state.user,
      forgotPasswordData:state.forgotPassword
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
