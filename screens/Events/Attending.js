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
import { FontAwesome } from '@expo/vector-icons';
import * as actions from '../../redux/action';
import Card from '../../components/card';
import {getAttendingEventRequest} from '../../redux/action';
import { withNavigationFocus } from 'react-navigation';

class Attending extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attendingEvents:[]
    }
   
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  async componentDidMount(){
    let token =this.props.user.user.status.token
    await this.props.getAttendingEventRequest(token)
  }
  
  componentWillReceiveProps(nextProps){
    const {attending,isLoading} = this.props.getInterestedEvent
    if(nextProps.getInterestedEvent.attending.data !== undefined){
      if(nextProps.getInterestedEvent.attending !== attending){
        this.setState({attendingEvents:nextProps.getInterestedEvent.attending.data.results})
      }    
    }
  }

  async componentDidUpdate(prevProps){
    if(prevProps.isFocused !== this.props.isFocused){
      let token =this.props.user.user.status.token
      await this.props.getAttendingEventRequest(token)
    }
  }
  _renderItem=({item,index})=>{
    console.log(item,"cecececececcecec");
    
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
    const {status,attendingLoading} = this.props.getInterestedEvent
    const {attendingEvents} = this.state;
    return (
      <View style={styles.mainContainer}>
        {
          !attendingLoading  ?
            <View style={styles.mainContainer} >
                {attendingEvents.length?<FlatList 
                data={this.state.attendingEvents}
                keyExtractor={(item,index)=>(index.toString())}
                showsVerticalScrollIndicator={false}
                renderItem={this._renderItem}
                />:
                <View style={styles.suggestion}>
                    <Text>
                      Your are not attending any event yet !!
                    </Text>
                </View>
                }
            </View>
            :
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
  suggestion:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  loaderStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

const mapStateToProps = (state) => {
  return {
      getInterestedEvent:state.getInterestedEvent,
      user:state.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(withNavigationFocus(Attending));
    
