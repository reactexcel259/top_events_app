import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import Touch from 'react-native-touch';
import { bindActionCreators } from "redux";
import Layout from "../../constants/Layout";
import { LinearGradient, Font } from 'expo';
import * as actions from '../../redux/action';
import Card from '../../components/card';
import { withNavigationFocus } from 'react-navigation';

class Wishlist extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      wishList:[]
    }
   
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  async componentDidMount(){
    let token =this.props.user.user.status.token

    await this.props.getInterestedEventRequest(token)
  }
  
  componentWillReceiveProps(nextProps){
    console.log(this.props.isFocused,"this.props.isFocused");
    const {status,isLoading} = this.props.getInterestedEvent
    if(nextProps.getInterestedEvent.status.data !== undefined){
      if(nextProps.getInterestedEvent.status !== status){
        this.setState({wishList:nextProps.getInterestedEvent.status.data.results})
      }    
    }
  }
  async componentDidUpdate(prevProps){
    console.log(this.props.isFocused,"this.props.isFocusedDidUpdate");
    if(prevProps.isFocused !== this.props.isFocused){
      let token =this.props.user.user.status.token
      await this.props.getInterestedEventRequest(token)
    }
  }
  _renderItem=({item,index})=>{
    return(
        <View>
            <Touch 
            activeOpacity={0.05}
            onPress={()=>this.props.navigation.navigate("CityEventDescription",{item:item})}
            >
                <Card item={item}/>
            </Touch>
        </View>
    )
  }

  render() {
    const {status,isLoading} = this.props.getInterestedEvent
    
    return (
      <View style={styles.mainContainer}>
        {
          !isLoading  ?
          <FlatList 
          data={this.state.wishList}
          keyExtractor={(item,index)=>(index.toString())}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
          />:
          <View style={styles.loaderStyle}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'white'
  },
  loaderStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

const mapStateToProps = (state) => {
  return {
      user: state.user, 
      getInterestedEvent:state.getInterestedEvent
      
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(Wishlist));
    
