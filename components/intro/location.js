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
import { uniqBy } from "lodash";

export default class Locations extends React.Component {
  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { data } = this.props.stateAndCity.status;
    const {allCities} =this.props
    const regex = new RegExp(`${query.trim()}`, 'i');
    return allCities.filter(city => city.name.search(regex) >= 0);
  }
  render() {
    const { data } = this.props.stateAndCity.status;
    const { onPress, onSearchChange, isChange, search, stateAndCity, onChangeSearch, selected,allCities, onCancelPress } = this.props
    const films = /* search != '' ? this.findFilm(search) : */ uniqBy(allCities, "name");
    let checkSelected = Object.keys(search).length ? selected  ? true : false : true;
    return (
      <LinearGradient
          style={styles.mainContainer}
          colors={['#FF6CC9','#8559F0']}
          start={[1,0]}
          end={[1, 1]}
        >
        {/* <View style={styles.headerContainer} >
          <Text style={styles.headerText} > Add Location </Text>
        </View>
        <View style={styles.intrestContainer} >
        <View style={{flexDirection:'row', margin:20}}>
        {
        isChange ? 
          <View style={{flex:1}}>
            <Text style={{color:'white'}} > {search} </Text>
          </View>
        :
          <View style={[Object.keys(search).length ? styles.searchPresent :styles.searchContainer]} >
            <FontAwesome name="search" size={20} style={{ margin: 7,color: 'gray' }} />
            <TextInput
              value={search}
              style={[Object.keys(search).length ? styles.searchBoxResults : styles.searchBox ]}
              onChangeText={(text) => onSearchChange(text,true)}
              placeholder="Search city"
            />
        </View>}
        {Object.keys(search).length && !isChange ?
            <View style={styles.buttonOuter}>
              <TouchableOpacity style={styles.buttonContainer} onPress={onCancelPress}>
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
              :null
        }
        {isChange?
            <View style={{flexDirection:'row',marginLeft:10}}>
              <TouchableOpacity style={{flexDirection:'row'}}  onPress={onChangeSearch}>
              <FontAwesome name="location-arrow" size={20} style={{ marginTop: 2,marginRight:5,color: 'black' }} />            
              <Text style={{color:'white',fontSize:14, marginLeft:5}} > Change </Text>
              </TouchableOpacity>
            </View>
              :null
        }
        </View>
        </View> */}
        {films.length >= 1?
          <FlatList
            data={films}
            numColumns={Layout.window.width > 380 ? 4 :3}
            ListHeaderComponent={()=>{
              return <View style={styles.underLine}>
              <Text style={styles.eventsText}>Events within or nearby your City</Text>
          </View>
            }}
            keyExtractor={(item, index) => item._id}
            renderItem={({item})=>{
              return(
                <TouchableOpacity onPress={()=>{onSearchChange(item.name, false)}}>
                    <LinearGradient
                      colors={ search == item.name ? ['#FFFFFF','#FFFFFF'] : ['rgba(255,255,255,0)','rgba(255,255,255,0)']}
                      start={[0, 0]}
                      end={[1, 0]}
                      style={styles.bubbleContainer}
                    >
                      {/* <View style={styles.suggestionContainer}> */}
                        <Text style={[styles.bubbleText,search == item.name?{color:'#FF6CC9'}:{}]}>{item.name}</Text>
                      {/* </View> */}
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
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:40}} >
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
    justifyContent:'space-between',
    borderWidth:1
  },
  bubbleContainer:{
    borderWidth:1,
    margin:3,
    borderRadius:20,
    paddingRight:15,
    paddingLeft:15,
    borderColor:'#D8D8D8',
    height:40,
    alignItems:'center',
    justifyContent:'center'
  },
  bubbleText:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:10,
    color:'#D8D8D8',
    fontWeight:'900'
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
    margin:20
  },
  autoSerach:{
    // position:'absolute',
  },
  suggestionContainer:{
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth:0.3,
    borderBottomColor:'#dcdde1',
    marginLeft:52,
  },
  suggestionText:{
    color:'#dcdde1',
    paddingTop:5,
    paddingBottom:5
  },
  searchBoxResults:{
    width:Layout.window.width * 0.60,
    height:40,
  },
  searchPresent:{
    flexDirection:'row',
    borderRadius:5,
    borderWidth:1,
    borderColor:'#dcdde1',
    backgroundColor:'#f5f6fa',
    height:45,
    alignItems:'center',
    width:Layout.window.width * 0.70,
  },
  buttonChangeContainer:{
    width:Layout.window.width * 0.30,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:45,
    zIndex:22222
  },
  buttonContainer:{
    width:Layout.window.width * 0.20,
    justifyContent:'center',
    alignItems:'center',
    height:45,
    zIndex:22222
  },
  buttonOuter:{
    marginLeft:10
  },
  buttonText:{
    color:'#f5f6fa'
  },
  underLine:{
    flexDirection:"row",
        justifyContent:"center",
        alignItems:'center',
        // borderBottomWidth:0.6,
        marginTop:5,
        borderBottomColor:'#f5f6fa',
        marginBottom:20
  },
  eventsText:{
    color:'white',
    fontWeight:'600',
    fontSize:18,
    marginBottom:10
  }
});
