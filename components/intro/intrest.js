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
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'

export default class Intrest extends React.Component {
   
  
  render() {
    const {  onPress,id, data, category, selectedInt } = this.props
    
      return (
      // <View  >
        <LinearGradient
          style={styles.mainContainer}
          colors={['#FF6CC9','#8559F0']}
          start={[1,0]}
          end={[1, 1]}
        >
        <View style={styles.headerContainer} >
          <Text style={styles.headerText} > What are your interests? </Text>
        </View>
        {
          category.isLoading?
              <ActivityIndicator
               size="small" 
               color="#ffff" 
                style={styles.activityIndicator}
              />:
          <View style={styles.intrestContainer} >
          <View style={{flexDirection:'row',flexWrap:'wrap'}} >
             <FlatList
                keyExtractor={(item, index) => item._id}
                numColumns={3}
                style={styles.flatList}
                data={data}
                extraData={this.props}
                renderItem={({item})=>{
                  let selected = item.selected !== undefined ? item.selected : false;
                  return(
                    <TouchableOpacity onPress={()=>{this.props.selectInterests(item._id)}}>
                        <LinearGradient
                          colors={selected?['#FFFFFF','#FFFFFF']:['rgba(255,255,255,0)','rgba(255,255,255,0)']}
                          style={{ flex: 1 }}
                          start={[0, 0]}
                          end={[1, 0]}
                          style={styles.bubbleContainer}
                        >
                          <Text style={[styles.bubbleText,selected?{color:'#FF6CC9'}:{}]} > {item.name} </Text>
                        </LinearGradient> 
                    </TouchableOpacity>
                  )
                }}
             />
          </View>
        </View>}
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:50}} >
              <CustomeButton
                buttonText={"Next"}
                gradientColor={['#FF6CC9','#FF6CC9']}
                textColor={'white'}
                onPress={onPress}
              />            
          </View>  
        </LinearGradient>
      // </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1,
    paddingTop:15
  },
  headerContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    color:'white',
    fontWeight:'600',
    fontSize:18,
    marginBottom:10
  },
  intrestContainer:{
    margin:10,
    justifyContent:'space-between'
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
  flatList:{
    flexDirection: 'column',
  },
  bubbleText:{
    alignSelf:'center',
    textAlign:'center',
    fontSize:10,
    color:'#D8D8D8',
    fontWeight:'900'
  },
  activityIndicator:{
    marginTop:Layout.window.height * 0.3
  }
});
