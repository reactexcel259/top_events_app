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
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import CustomeButton from '../components/button'
import Layout from '../constants/Layout';
import * as actions from '../redux/action';
import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentWillMount() {
    AsyncStorage.getItem('user').then((data)=>{
      if(data != null){
        let payload = JSON.parse(data)
        this.props.getLoginSuccess(payload)
        this.props.navigation.navigate('HomeTab')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/photo.png')}
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
                gradientColor={['#FF6CC9','#8559F0']}
                textColor={'white'}
                onPress={()=>{ this.props.navigation.navigate('setup') }}
              />
            </View>
            <View style={{alignSelf:'center',paddingBottom:20}} >
              <CustomeButton
                
                buttonText={"Sign In"}
                gradientColor={['#FFFFFF','#FFFFFF']}
                textColor={'black'}
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
    width:Layout.window.width * 0.94 ,
    height:Layout.window.height * 0.52,
    backgroundColor:'#ffffff',
    opacity:0.93,
    position:'absolute',
    top: Layout.window.height * 0.50, 
    left: 0, 
    right: 0, 
    bottom: 0,
    marginLeft:10,
    marginRight:10,
    // borderRadius:25,
    borderTopStartRadius:30,
    borderTopEndRadius:30
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
    height:Layout.window.height * 0.15 ,
    width: Layout.window.width * 0.63,

  },
  suggestion:{
    // padding:20,
    fontSize:15,
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