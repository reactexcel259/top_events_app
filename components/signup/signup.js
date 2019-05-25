import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Dimensions
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'
const width = Dimensions.get('window').width;
export default class SignUpContainer extends React.Component {
  render() {
    const { onPress, onChange, firstName, lastName, socialLogin, googleLogin } = this.props;
    return (
      <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={120}  behavior="padding" enabled >      
      <View style={styles.container}>
       <View style={styles.labelContainer} >
          <Text style={styles.label} >Sign up </Text>
       </View>
       <View style={styles.inputContainer} >
          <View style={styles.inputBottomMargin} >
            <TextInput
            style={styles.textInput}
            value={firstName}
            onChangeText={(text)=>{ onChange(text,'firstname') }}            
            placeholder={'First name'}
            />
          </View>
          <View style={styles.inputBottomMargin} >
            <TextInput
            style={styles.textInput}
            value={lastName}
            onChangeText={(text)=>{ onChange(text,'lastname') }}
            placeholder={'Last name'}
            />
          </View>

          <View style={{alignItems:'center',marginBottom:10}} >
            <CustomeButton
              buttonText={"Next"}
              buttonSize={'small'}
              gradientColor={['#FF6CC9','#8559F0']}
              textColor={'white'}
              onPress={()=>{ onPress() }}
            />
          </View>
       </View>
       <View style={styles.signupContainer} >
          <View>
            <Text style={styles.signupLabel} >Sign up with </Text>
          </View>
          <View style={styles.imageContainer} >
          <TouchableOpacity onPress={() => { socialLogin()}} >
            <Image
              style={styles.imageSize}
              source={require('../../assets/images/fbicon.png')}
            />
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => { googleLogin()}} >
            <Image
              style={[styles.imageSize,styles.imageMargin]}
              source={require('../../assets/images/googleLogo.png')}
            />
            </TouchableOpacity> */}
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
    justifyContent:'space-between',
    margin:20
  },
  labelContainer:{
    alignItems:'center',
    marginTop:10
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
    marginLeft:75,
    flexDirection:'row'
  },
  imageSize:{
    height:25,
    width:25
  },
  imageMargin:{
    marginLeft:30
  },
  signupLabel:{
    fontSize:15,
    color:'gray'
  },
  inputContainer:{
    marginLeft:10,
    marginRight:10
  },
  inputBottomMargin:{
    marginBottom:30
  },
  signupContainer:{
    marginBottom:5,
    flexDirection:'row',
  }
});
