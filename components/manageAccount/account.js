import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import Layout from '../../constants/Layout';
import { MonoText } from '../StyledText';
import CustomeButton from '../button';

export default class Account extends React.Component {
  render() {
    const { title, email, newPassword, newEmail, onChange,userPasswordDetail, confirmPassword,currentPassword, buttonText, buttonPress, type } = this.props
    return (
      <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={10}  behavior="padding" enabled >      
      <View style={{flex:1,justifyContent:'space-between',backgroundColor:'white',borderRadius:10,marginLeft:10,marginRight:10}} >
        <View>
          <Text style={{textAlign:'center',fontWeight:'500',fontSize:22,marginTop:20}} >
            {title}
          </Text>
        </View>
        <View style={{margin:20}} >
            <View style={styles.inputBottomMargin} >
              {
                type == 'changePassword' &&
                <TextInput
                style={styles.textInput}
                value={currentPassword}
                secureTextEntry                
                onChangeText={(text)=>{ onChange(text,'currentPassword') }}            
                placeholder={'Current Password'}
                />
              }
              {userPasswordDetail.user.passwordReset && userPasswordDetail.user.passwordReset.success ==false  &&  <Text>{userPasswordDetail.user.passwordReset.message}</Text>}
              {
                type == 'resetPassword' && 
                <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(text)=>{ onChange(text,'email') }}            
                placeholder={'Email'}
                />
              }
              {
                type == 'changeEmail' && 
                <TextInput
                style={styles.textInput}
                value={email}
                keyboardType='email-address'                
                editable={false}
                onChangeText={(text)=>{ onChange(text,'email') }}            
                placeholder={'your Email'}
                />
              }
            </View>
            <View style={styles.inputBottomMargin} >
              {
                type == 'changePassword' &&
                <TextInput
                style={styles.textInput}
                value={newPassword}
                secureTextEntry                
                onChangeText={(text)=>{ onChange(text,'newPassword') }}
                placeholder={'New Password'}
                />
              }
              {
                type == 'changeEmail' &&
                <TextInput
                style={styles.textInput}
                value={newEmail}
                keyboardType='email-address'                
                onChangeText={(text)=>{ onChange(text,'newEmail') }}
                placeholder={'New email'}
                />
              }
              {
                type == 'resetPassword' &&
                <Text style={{color:'lightgray'}} >
                  Please enter your registered e-mail to send you reset instruction
                </Text>
              }
            </View>
          </View>

            <View style={{alignItems:'center',marginBottom:40}} >
              <CustomeButton
                buttonText={buttonText}
                gradientColor={['#FF6CC9','#8559F0']}
                textColor={'white'}
                onPress={()=>{ buttonPress() }}
              />
            </View>
      </View>
      </KeyboardAvoidingView>      
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  inputContainer:{
    marginLeft:10,
    marginRight:10
  },
  inputBottomMargin:{
    marginBottom:30
  },
  textInput:{
    borderBottomWidth:1,
    borderColor:'gray'
  },
});
