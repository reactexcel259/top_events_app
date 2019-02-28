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

export default class Locations extends React.Component {
  
  render() {
    const { onPress } = this.props
    return (
      <LinearGradient
          style={styles.mainContainer}
          colors={['#FF6CC9','#8559F0']}
          start={[1,0]}
          end={[1, 1]}
        >
        <View style={styles.headerContainer} >
          <Text style={styles.headerText} > Add Location </Text>
        </View>
        <View style={styles.intrestContainer} >
        <View style={styles.searchContainer} >
          <FontAwesome name="search" size={20} style={{ margin: 7,color: 'gray' }} />
          <TextInput
            style={styles.searchBox}
            placeholder="Search city"
          />
        </View>
        <TouchableOpacity onPress={()=>{this.props.useCurrentLocation()}}>
          <View style={styles.locationBox} >
            <FontAwesome name="location-arrow" size={20} style={{ marginTop: 2,marginRight:5,color: 'black' }} />            
              <Text style={{color:'white',fontSize:14, marginLeft:5}} > Use Current location </Text>
          </View>

        </TouchableOpacity>
        </View>
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:50}} >
              <CustomeButton
                buttonText={"Next"}
                gradientColor={['#FF6CC9','#FF6CC9']}
                textColor={'white'}
                onPress={onPress}
              />            
          </View>
        </LinearGradient>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1
  },
  headerContainer:{
    marginTop:20,
    marginBottom:10,
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontWeight:'600',
    fontSize:18,
    color:'white'
  },
  intrestContainer:{
    margin:20,
    justifyContent:'space-between'
  },

  searchContainer:{
    flexDirection:'row',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#dcdde1',
    backgroundColor:'#f5f6fa',
    height:45,
    alignItems:'center'
  },
  searchBox:{
    width:Layout.window.width * 0.78
  },
  locationBox:{
    flexDirection:'row',
    marginTop:20
  }
});
