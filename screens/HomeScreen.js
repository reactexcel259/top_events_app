import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { Asset, SplashScreen, WebBrowser,  AppAuth, GoogleSignIn } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import CustomeButton from '../components/button'
import Layout from '../constants/Layout';
import * as actions from '../redux/action';
import { MonoText } from '../components/StyledText';
import {isIphoneX} from '../constants/Layout';
// import { AppAuth } from 'expo-app-auth';
// import * as Constants from 'expo-constants';
// import { GoogleSignIn } from 'expo-google-sign-in';


// import { AppAuth } from 'expo-app-auth';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async componentWillMount() {
    this.props.getInterestRequest()
    await AsyncStorage.getItem('user').then((data)=>{
      if(data != null){
        let payload = JSON.parse(data)
        this.props.getLoginSuccess(payload)
        this.props.getUserDataRequest(payload.token);
        this.props.navigation.navigate('HomeTab')
      }
    })
    SplashScreen.hide();
    this.initilizeGoogle()
  }

  initilizeGoogle = async () => {
   const { OAuthRedirect, URLSchemes } = AppAuth;
   GoogleSignIn.allowInClient();
    try {
      let clientId = Platform.OS == 'android' ? "501387798556-d4cf5dagg9svp7nd93u68676tg0lgd4l.apps.googleusercontent.com" : "501387798556-ie9nd89ouu3i567v9rm2ibmfd7j6eb3c.apps.googleusercontent.com" ;
      let res =  await GoogleSignIn.initAsync({ 
        isOfflineEnabled: true,
        isPromptEnabled: true,
        clientId 
      });
    } catch ({ message }) {
      console.log(message)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          // resizeMode='center'
          source={require('../assets/images/image21.jpeg')}
        />
        <View style={styles.ovalContainer}>
          <View style={styles.ovalContent} >
          <View style={styles.imageContainer}>
            <Image
              style={styles.logoImage}
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
            />
          </View>
            <Text style={styles.suggestion}>
              Find the best events in Jamaica
            </Text>
            <View style={{alignSelf:'center',}} >
              <CustomeButton
                buttonText={"Get Started"}
                buttonSize={'small'}
                gradientColor={['#FF6CC9','#8559F0']}
                textColor={'white'}
                onPress={()=>{ this.props.navigation.navigate('setup') }}
              />
            </View>
            <View style={{alignSelf:'center',paddingBottom:20}} >
              <CustomeButton
                buttonText={"Sign In"}
                buttonSize={'small'}                
                gradientColor={['#ffffff','#ffffff']}
                textColor={'#8559F0'}
                onPress={()=>{ this.props.navigation.navigate('SignUpScreen',{isLogin:true}) }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  image :{
    height: Layout.window.height,
    width: Layout.window.width
  },
  ovalContainer:{
    width:Layout.window.width * 0.74 ,
    height: isIphoneX() ? Layout.window.height * 0.44 :Layout.window.height * 0.42,
    backgroundColor:'#ffffff',
    opacity:0.93,
    position:'absolute',
    top: Layout.window.height * 0.45, 
    left: 0, 
    right: 0, 
    bottom: 0,
    marginLeft:50,
    marginRight:20,
    borderRadius:30,
    // borderTopStartRadius:30,
    // borderTopEndRadius:30
  },
  ovalContent:{
    flex:1,
    justifyContent:'space-evenly',
    flexDirection:'column',
    alignItems:'center'
  },
  imageContainer:{
    paddingTop: Layout.window.height * 0.01,
    paddingBottom: Layout.window.height * 0.004,
    justifyContent:'center',
    alignItems:'center',
    width:Layout.window.width
  },
  logoImage:{
    height:Layout.window.height * 0.08 ,
    width: Layout.window.width * 0.43,

  },
  suggestion:{
    // padding:20,
    fontSize:15,
    fontWeight:'500',
    width: Layout.window.width * 0.45,
    textAlign:'center'
  },
});

const mapStateToProps = (state) => {
  return {
      state: state,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);