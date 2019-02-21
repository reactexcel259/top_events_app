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
    const {  onPress,id, data } = this.props
      return (
      <View style={styles.mainContainer} >
        <View style={styles.headerContainer} >
          <Text style={styles.headerText} > What are your Interests? </Text>
        </View>
        <View style={styles.intrestContainer} >
          <View style={{flexDirection:'row',flexWrap:'wrap'}} >
             <FlatList
                keyExtractor={(item, index) => item.id}
                numColumns={4}
                style={styles.flatList}
                data={data}
                extraData={this.props}
                renderItem={({item})=>{
                  let selected = item.selected !== undefined ? item.selected : false;
                  return(
                    <TouchableOpacity onPress={()=>{this.props.selectInterests(item.id)}}>
                        <LinearGradient
                          colors={selected?['#FF6CC9','#8559F0']:['white','white']}
                          style={{ flex: 1 }}
                          start={[0, 0]}
                          end={[1, 0]}
                          style={styles.bubbleContainer}
                        >
                          <Text style={styles.bubbleText} > {item.item} </Text>
                        </LinearGradient>
                    </TouchableOpacity>
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
  }
});
