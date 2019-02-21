import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  TextInput,
  FlatList,
  StatusBar
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'

export default class Location extends React.Component {
  
  render() {
    const { onPress } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.headerContainer} >
          <Text style={styles.headerText} > Add Loccation </Text>
        </View>
        <View style={styles.intrestContainer} >
        <View style={styles.searchContainer} >
          <FontAwesome name="search" size={18} style={{ margin: 7,color: 'gray' }} />
          <TextInput
            placeholder="Search city"
          />
          </View>
          <View style={{flexDirection:'row',marginTop:5}} >
          <FontAwesome name="location-arrow" size={18} style={{ marginLeft: 7,marginRight:5,color: 'black' }} />            
            <Text style={{color:'black',fontWeight:'500'}} > Use Current location </Text>
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
    margin:20,
    justifyContent:'space-between'
  },
  bubbleContainer:{
    margin:4,
    width:80,
    borderRadius:40,
    borderColor:'gray',
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  searchContainer:{
    flexDirection:'row',
    borderRadius:5,
    borderWidth:1,
    borderColor:'lightgray',
    backgroundColor:'#E5E5E5',
    height:40,
    alignItems:'center'
  }
});
