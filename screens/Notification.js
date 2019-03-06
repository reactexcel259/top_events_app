import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Layout from "../constants/Layout";
import { LinearGradient, Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import * as actions from '../redux/action';
import CustomHeader from '../components/header';

class Notifications extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
   
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isCenter={true}
          centerTitle={'Notifications'}
        />    

        <View style={{flex:1,margin:20}} >
          <FlatList
          data={['asd']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{flexDirection:'row',borderBottomWidth: 1,height:100}} >
              <View style={{width:Layout.window.width * 0.25}} >
                <Image source={require('../assets/images/logo.png')} style={{height:60,width:60,borderRadius:5}} />
              </View>
              <View style={{flexDirection:'column',justifyContent:'space-between',marginBottom:20,flexWrap:'wrap',width:Layout.window.width * 0.62}} >
                <View style={{flexWrap:'wrap',flex:1,}} >
                  <Text  ><Text style={{fontWeight:'600'}} >Jamaica Dream weekend </Text>
                   is coming up in 2 days. you were interested in this event. </Text>
                </View>
                <View>
                  <Text style={{}} >Today</Text>
                </View>
              </View>
            </View>  
          )}
        />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white'
  },
});

const mapStateToProps = (state) => {
  return {
      state: state,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Notifications);
    
