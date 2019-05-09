import React, { Component } from "react";
import { Text, View ,StyleSheet ,Image, TextInput, TouchableOpacity, FlatList} from "react-native";
import Layout from "../constants/Layout";
import {LinearGradient} from 'expo';
import Modal from "react-native-modalbox";
import CustomeButton from './button'
import { uniqBy } from "lodash";

import { FontAwesome ,EvilIcons } from '@expo/vector-icons';

export default class ChangeLocation extends Component {
    findFilm(query) {
      if (query === '' || query === undefined) {
          return [];
        }
    
        const { data } = this.props.stateAndCity.status;

        const {allCities}=this.props;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return allCities ? allCities.filter(city => city.name.search(regex) >= 0) : '';
    }
    render() {
      const { data } = this.props.stateAndCity.status;
      const {changeLocationModal, onPress, onSearchChange, search, stateAndCity,allCities, selected, onCancelPress } = this.props;
      const films = /* search != '' && search != undefined ? this.findFilm(search) :  */uniqBy(allCities, "name")  ;
      let checkSelected = search != undefined ? Object.keys(search).length ? selected  ? true : false : true: true;
    return (
      <Modal
        isDisabled={false}
        coverScreen={true}
        backdropPressToClose={true}
        swipeToClose={false}
        style={styles.modal}
        isOpen={changeLocationModal}
        // position={"center"}
      >
        <LinearGradient
          style={styles.mainContainer}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={["#ff6cc9", "#8559f0"]}
        >
        <TouchableOpacity onPress={()=>{this.props.closeModal()}} style={styles.headerContainer} >
          <Text style={styles.headerText} > X </Text>
        </TouchableOpacity>
        {/* <View style={styles.intrestContainer} > */}
        {/* <View style={{flexDirection:'row', margin:20}}>
          <View style={[Object.keys(search).length ? styles.searchPresent :styles.searchContainer]} >
            <FontAwesome name="search" size={20} style={{ margin: 7,color: 'gray' }} />
            <TextInput
              value={search}
              style={[Object.keys(search).length ? styles.searchBoxResults : styles.searchBox ]}
              onChangeText={(text) => onSearchChange(text,true)}
              placeholder="Search city"
            />
        </View>
        {Object.keys(search).length?
            <View style={styles.buttonOuter}>
              <TouchableOpacity style={styles.buttonContainer} onPress={onCancelPress}>
                <Text style={styles.buttonText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
              :null
        }x
        </View> */}
        {/* </View> */}
        
        { films && films.length >= 1 ?
          <FlatList
            data={films}
            numColumns={Layout.window.width > 380 ? 4 :3 }
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
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
      },
      headerContainer:{
        padding:18,
        alignItems:'flex-start'
      },
      headerText:{
        fontWeight:'600',
        fontSize:18,
        color:'white'
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
      intrestContainer:{
        margin:20,
        justifyContent:'space-between',
        borderWidth:1
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