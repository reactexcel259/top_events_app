import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'

export default class DetailsContainer extends React.Component {
  render() {
    const { onPress, onChange, email, password } = this.props;    
    return (
      <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={120}  behavior="padding" enabled >      
      <View style={styles.container}>
       <View style={styles.labelContainer} >
          {/* <View style={{borderWidth:1,justifyContent:'center',alignItems:'center',height:80,width:80,borderRadius:50}} >
            <FontAwesome
              name={'camera'} size={32} style={{margin:5}} color="gray" />
          </View> */}
          <View style={{width:120,height:80}}>
              <Image style={{width:"100%",height:"100%"}} resizeMode="contain" source={require('../../assets/images/logo_transparent.cc756712.png')}/>
          </View>
       </View>
       <View style={styles.inputContainer} >
          <View style={styles.inputBottomMargin} >
            <TextInput
            style={styles.textInput}
            value={email}
            keyboardType='email-address'            
            onChangeText={(text)=>{ onChange(text,'email') }}
            placeholder={'Email'}
            />
          </View>
          <View style={styles.inputBottomMargin} >
            <TextInput
            style={styles.textInput}
            value={password}
            secureTextEntry
            onChangeText={(text)=>{ onChange(text,'password') }}
            placeholder={'Password'}
            />
          </View>

          <View style={{alignItems:'center'}} >
            <CustomeButton
              buttonText={"Sign Up"}
              buttonSize={'small'}
              gradientColor={['#FF6CC9','#8559F0']}
              textColor={'white'}
              onPress={()=>{ onPress() }}
            />
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
    marginBottom:20
  },
  label:{
    fontWeight:'600',
    fontSize:18
  },
  textInput:{
    borderBottomWidth:1,
    borderColor:'gray'
  },
  inputContainer:{
    marginLeft:10,
    marginRight:10,
    marginBottom:40
  },
  inputBottomMargin:{
    marginBottom:40
  },
});
