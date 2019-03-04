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
import Intrest from '../components/intro/intrest'

class ProfileSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props){
    super(props)
    this.state={
      interest: []
    }
  }

  async componentWillMount(){
    await this.props.getCategoryRequest(); 
  }

  componentWillReceiveProps(nextProps){
    const { getCategoryData } = this.props;
    if (getCategoryData.status !== nextProps.getCategoryData.status){
      this.setState({interest:nextProps.getCategoryData.status.data})
    }
  }

  goBack = () => {
    const { navigation } = this.props;
  }

  selectInterests = (id) => {
    let int = this.state.interest;
    for (let index = 0; index < int.length; index++) {
      if(int[index]._id === id){
        if(int[index] !== undefined && int[index].selected){
          int[index]["selected"] = false ;
        }else {
          int[index]["selected"] = true ;
        }
      }
    }
    this.setState({interest:int})
  }
  
  render() {
    const { getCategoryData } = this.props;
    const { interest } = this.state;
    console.log(interest)
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isLeft
          leftIcon={'angle-left'}
          leftPress={this.goBack}
          isCenter={true}
          centerTitle={'Profile settings'}
        />    

        <View style={{flex:1,backgroundColor:'lightgray'}} >
        
        {
          interest &&
          <Intrest
            {...this.state}
            {...this.props}
            category={getCategoryData}
            data={interest}
            selectInterests={(id)=>{this.selectInterests(id)}}
            
          />
        }
          
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
});

const mapStateToProps = (state) => {
  return {
      user: state.user,
      getCategoryData: state.getCategory,      
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(ProfileSettingScreen);
    
