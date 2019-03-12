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
  View,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../redux/action';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
import LoginContainer from '../components/signup/login';
import SignUpContainer from '../components/signup/signup';
import DetailsContainer from '../components/signup/details';
import WelcomeContainer from '../components/signup/welcome';
import {setItem, getItem} from '../services/storage';
import { validateEmail } from '../services/validation';

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
    }
  }

  async componentWillMount() {
    const { navigation } = this.props;
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

  componentWillReceiveProps(nextProps){
    const { login } = this.state;
    if(nextProps.user.user.isSuccess && nextProps.user.user.status.session){      
        Alert.alert(
          'Congrats!',
          login ? 'Login Successfull' :'Sign Up successfully !!'
        )
      this.setState({
        loader:false,
        email:'',
        password:'',
        firstName:'',
        lastName:'',
      })
      this.props.closeSuccessModel()
      if(this.state.progress != 3 && !login){
        this.props.navigation.setParams({isLogin:true})
        this.setState({
          login:true
        })
      } else if(login){
        this.props.navigation.navigate('HomeTab')        
      }
    } else if(nextProps.user.user.isError){
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          login ? 'Login Failed' : 'This email id is already registered.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){
        Alert.alert(
          'Congrats!',
          login ? 'Login Failed' : 'This email id is already registered.'
        )
      }
    } else if (!nextProps.user.user.status.session && nextProps.user.user.status.session !== undefined ){
        Alert.alert(
          'Alert !!',
          `${nextProps.user.user.status.message}`
        )
    } 
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
      Alert.alert(
          'Warning!',
          'Enter Correct Email ID'
        )
    }
  }

  renderProgress = () => {
    const { progress, firstName, lastName, email, password, login } = this.state;    
    if( progress == 1) {
      return(
        <SignUpContainer 
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

  backPress = () => {
    const { navigation } = this.props;
    if ( navigation.state.params && navigation.state.params.isLogin ){
      navigation.popToTop()
    } else {
      this.setState({ login: false })
    }
  }
  
  render() {
    const { progress, firstName, lastName, email, password, login } = this.state;
    const { user } = this.props;
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
              source={require('../assets/images/photo.png')}
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
                progress == 2  &&
                <TouchableOpacity onPress={this.laterPress} >
                  <Text style={{color:'white',fontSize:17}} > Do it later </Text>
                </TouchableOpacity>
              }
          </View>
        </View>
          <View style={styles.miniContainer} >
          { user.user.isLoading ?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <ActivityIndicator size="large" color="black" animating={user.user.isLoading} />
          </View>
          :
            login ?
             <LoginContainer
              onPress={this.login}
              email={email}
              iconPress={this.backPress}
              password={password}
              onChange={this.textChange}
            /> 
          :
            this.renderProgress()
        }
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
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(SignUpScreen);
