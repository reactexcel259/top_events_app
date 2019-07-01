import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { FontAwesome ,EvilIcons } from '@expo/vector-icons';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'
const width = Dimensions.get('window').width;
export default class LoginContainer extends React.Component {
  constructor(props){
    super(props);
    this.state={isForgotPassword:false}
  }
  googleLogin=()=>{
    this.props.googleLogin()
  }

  socialLogin=()=>{
    this.props.socialLogin()
  }
  forgotPassword=()=>{
    this.props.forgotPasswordStateHandler()
  }
  render() {
    const { onPress, onChange, firstName,isForgotPassword, lastName,onPressForgotPassword,onChangeForPassword,emailForPassword, iconPress, socialLogin, googleLogin } = this.props;
    
    return (
      <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={120}  behavior="padding" enabled >      
      <View style={styles.container}>
      <TouchableOpacity onPress={iconPress} >
        <EvilIcons name={'chevron-left'} size={35}  color="black" />
      </TouchableOpacity>
       <View style={styles.labelContainer} >
          <Text style={styles.label} > {isForgotPassword ? "Forgot Password" : "Login"} </Text>
       </View>
       <View style={styles.inputContainer} >
       {isForgotPassword && <View style={styles.inputBottomMargin} >
            <TextInput
            style={styles.textInput}
            value={emailForPassword}
            keyboardType='email-address'
            onChangeText={(value)=>{ onChangeForPassword(value) }}            
            placeholder={'Email'}
            />
          </View>}
         {!isForgotPassword && <View style={styles.inputBottomMargin} >
            <TextInput
            style={styles.textInput}
            value={firstName}
            keyboardType='email-address'
            onChangeText={(text)=>{ onChange(text,'email') }}            
            placeholder={'Email'}
            />
          </View>}
         {!isForgotPassword && 
         <View style={{marginBottom:10}} >
            <TextInput
            style={styles.textInput}
            value={lastName}
            secureTextEntry            
            onChangeText={(text)=>{ onChange(text,'password') }}
            placeholder={'Password'}
            />
          </View> }
          {!isForgotPassword && <View style={styles.forgotPasswordView}>
            <Text onPress={this.forgotPassword} style={styles.forgotText}>Forgot password?</Text>
          </View>}

          {isForgotPassword ?
            <View style={{alignItems:'center',marginBottom:10}} >
            <CustomeButton
              buttonText={"Submit"}
              buttonSize={'small'}
              gradientColor={['#FF6CC9','#8559F0']}
              textColor={'white'}
              onPress={isForgotPassword ? ()=>onPressForgotPassword() : ()=>{ onPress() }}
            />
          </View> :
             <View style={{alignItems:'center',marginBottom:10}} >
            <CustomeButton
              buttonText={"Log in"}
              buttonSize={'small'}
              gradientColor={['#FF6CC9','#8559F0']}
              textColor={'white'}
              onPress={()=>{ onPress() }}
            />
          </View>}
       </View>
       <View style={styles.signupContainer} >
          
          <View style={styles.imageContainer} >
          <View>
            <Text style={styles.signupLabel} >Sign in with </Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"center"}}>
          <TouchableOpacity onPress={this.socialLogin} >
            <Image
              style={styles.imageSize}
              source={require('../../assets/images/fbicon.png')}
            />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={this.googleLogin} >
            <Image
              style={[styles.imageSize,styles.imageMargin]}
              source={require('../../assets/images/googleLogo.png')}
            />
            </TouchableOpacity>
          </View>
          </View>
       </View>
      </View>
      </KeyboardAvoidingView>      
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
    justifyContent:'space-evenly',
    marginLeft:20,
    marginRight:20,
    marginBottom:10
  },
  labelContainer:{
    alignItems:'center',
  },
  label:{
    fontWeight:'600',
    fontSize:18
  },
  textInput:{
    borderBottomWidth:1,
    borderColor:'gray'
  },
  imageContainer:{
    // marginLeft:75,
    flexDirection:'column',
    alignItems:"center"
  },
  imageSize:{
    height:25,
    width:25
  },
  imageMargin:{
    marginLeft:10
  },
  signupLabel:{
    fontSize:15,
    color:'gray',
    marginBottom:7
  },
  inputContainer:{
    marginLeft:10,
    marginRight:10
  },
  inputBottomMargin:{
    marginBottom:30
  },
  signupContainer:{
    // marginTop:15,
    marginBottom:5,
    flexDirection:'column',
  },
  forgotPasswordView:{
    flexDirection:"row",
    justifyContent:"flex-end",
    marginBottom:10
  },
  forgotText:{
    fontSize:15,
    color:'gray'
  }
});
