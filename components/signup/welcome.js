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
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'

export default class WelcomeContainer extends React.Component {
  render() {
    const { onPress } = this.props;    
    return (
      <View style={styles.container}>
       <View style={styles.labelContainer} >
          <Text style={styles.labelText} > Welcome! </Text>
       </View>
       <View style={styles.inputContainer} >
         <View style={styles.inputSideContainer} >
            <Text style={styles.inputText} >
              Mauris non tempor quam, et lacinia sapien.
              Mauris accumaseros eget libero posuere
              vulputate. Etiam elit elit, elementum sed varius
              at, adipiscing viatae est.
            </Text>
         </View>

          <View style={{alignItems:'center'}} >
            <CustomeButton
              buttonText={"Find event"}
              gradientColor={['#FF6CC9','#8559F0']}
              textColor={'white'}
              onPress={()=>{ onPress() }}
            />
          </View>
       </View>
      </View>
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
    marginTop:30
  },
  label:{
    fontWeight:'600',
    fontSize:18
  },
  labelText:{
    fontWeight:'600',
    fontSize:25
  },
  inputSideContainer:{
    textAlign:'center',
    marginBottom:40
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
  inputText:{
    textAlign:'center',
    fontSize:16,
    color:'gray'
  }
});
