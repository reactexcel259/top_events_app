import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Layout from "../../constants/Layout";
import { LinearGradient, Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import * as actions from '../../redux/action';
import Card from '../../components/card';

class Attending extends React.Component {
  constructor(props){
    super(props)
   
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <View style={styles.mainContainer}>
          <Card />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'lightgray'
  },
});

const mapStateToProps = (state) => {
  return {
      state: state,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Attending);
    
