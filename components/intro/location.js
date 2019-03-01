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
import Autocomplete from 'react-native-autocomplete-input';

export default class Locations extends React.Component {
  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { data } = this.props.stateAndCity.status;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(city => city.name.search(regex) >= 0);
  }
  render() {
    const { onPress, onSearchChange, search, stateAndCity, selected } = this.props
    const films = this.findFilm(search);
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
                value={search}
                style={styles.searchBox}
                onChangeText={(text) => onSearchChange(text,true)}
                placeholder="Search city"
              />
        </View>
        {films.length >= 1 && selected?
          <FlatList
            data={films}
            keyExtractor={(item, index) => item._id}
            renderItem={({item})=>{
              return(
                <TouchableOpacity onPress={()=>{onSearchChange(item.name, false)}}>
                    <LinearGradient
                      colors={['rgba(255,255,255,0)','rgba(255,255,255,0)']}
                      start={[0, 0]}
                      end={[1, 0]}
                    >
                      <View style={styles.suggestionContainer}>
                        <Text style={styles.suggestionText}>{item.name}</Text>
                      </View>
                    </LinearGradient> 
                </TouchableOpacity>
              )
            }}
          />
        :<TouchableOpacity onPress={()=>{this.props.useCurrentLocation()}}>
          <View style={styles.locationBox} >
            <FontAwesome name="location-arrow" size={20} style={{ marginTop: 2,marginRight:5,color: 'black' }} />            
              <Text style={{color:'white',fontSize:14, marginLeft:5}} > Use Current location </Text>
          </View>
        </TouchableOpacity>}
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
    width:Layout.window.width * 0.78,
    height:40
  },
  locationBox:{
    flexDirection:'row',
    marginTop:20
  },
  autoSerach:{
    // position:'absolute',
  },
  suggestionContainer:{
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#dcdde1',
    marginLeft:32,
    marginRight:10,
  },
  suggestionText:{
    color:'#dcdde1',
    paddingTop:5,
    paddingBottom:5
  }
});
