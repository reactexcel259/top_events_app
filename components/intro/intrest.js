import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StatusBar
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'

export default class Intrest extends React.Component {
  
  
  render() {
    const {  onPress } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.headerContainer} >
          <Text style={styles.headerText} > What are your Interests? </Text>
        </View>
        <View style={styles.intrestContainer} >
          <View style={{flexDirection:'row',flexWrap:'wrap'}} >
             <FlatList
             horizontal
             data={[{item:'food'},{item:'concerts'},{item:'food'},{item:'concerts'},{item:'food'},{item:'concerts'}]}
             renderItem={({item})=>{
               console.log(item)
               return(
                <View style={styles.bubbleContainer} >
                  <Text style={{alignSelf:'center',textAlign:'center'}} > {item.item} </Text>
                </View>
               )
             }}
             />
          </View>
        </View>
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:50}} >
              <CustomeButton
                buttonText={"Next"}
                gradientColor={['#FF6CC9','#8559F0']}
                textColor={'white'}
                onPress={onPress}
              />            
          </View>              
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1
  },
  headerContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontWeight:'600',
    fontSize:20
  },
  intrestContainer:{
    borderWidth:1,
    margin:20,
    justifyContent:'space-between'
  },
  bubbleContainer:{
    borderWidth:1,
    margin:4,
    width:80,
    borderRadius:40,
    borderColor:'gray',
    height:40,
    alignItems:'center',
    justifyContent:'center'
  }
});
