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

class AccountSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
   
  }

  goBack = () => {
    const { navigation } = this.props;
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isLeft
          leftIcon={'angle-left'}
          leftPress={this.goBack}
          isCenter={true}
          centerTitle={'Account settings'}
        />    

        <View style={{flex:1,margin:20}} >
          
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
      user: state.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(AccountSettingScreen);
    
