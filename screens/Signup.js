import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import SignUpContainer from '../components/signup/signup';
import DetailsContainer from '../components/signup/details';
import WelcomeContainer from '../components/signup/welcome';

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
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.user.user.isSuccess){
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Registration Successful',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){
        Alert.alert('Congrats!','Registration Successful')
      }
      if(this.state.progress != 3){
        this.setState({
          progress: 3
        })
      }
    }
  }

  changeProgress = () => {
    const { progress, firstName, lastName, email, password } = this.state;    
    if(progress < 2 ){
      this.setState({ progress: progress +1 })
    } else if (progress == 2) {
      let payload = {
        name: {
          first: firstName,
          last: lastName 
        },
        email: email,
        password: password
      }
      this.props.getRegisterRequest(payload)
    } else if(progress == 3) {
      console.log('navigate',this.props)
      this.props.navigation.navigate('HomeTab')
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
  
  render() {
    const { progress, firstName, lastName, email, password } = this.state;
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

          <View style={{alignItems:'center',marginBottom:50}} >
              {
                progress == 1 &&
                <Text style={{color:'white',fontSize:17}} > Sign in </Text>
              }
              {
                progress == 2 &&
                <Text style={{color:'white',fontSize:17}} > Do it later </Text>
              }
          </View>
        </View>
          <View style={styles.miniContainer} >
          {
            progress == 1 &&
             <SignUpContainer 
              onPress={this.changeProgress}
              firstName={firstName}
              lastName={lastName}
              onChange={this.textChange}
            /> 
          }
          {
            progress == 2 &&
            <DetailsContainer 
              email={email}
              password={password}
              onChange={this.textChange}
              onPress={this.changeProgress}
            />
          }
          {
            progress == 3 &&
            <WelcomeContainer
              onPress={this.changeProgress}
            />
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
    height:Layout.window.height * 0.52,
    width:Layout.window.width * 0.95,
    top:Layout.window.height - 450,
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
