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
import {getInterestedEventRequest} from '../../redux/action';

class Attending extends React.Component {
  constructor(props){
    super(props)
   
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentDidMount(){
    let token =this.props.user.user.status.token
    this.props.getInterestedEventRequest(token)
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
    const eventsLength = this.props.getEventData.register.eventData.length;
    const events = this.props.getEventData.register.eventData;
    let eventDetails 
    let data = events.forEach(event=>{
      if(Object.keys(event).join() === 'sport'){
        eventDetails = event[Object.keys(event).join()].data
      }
      });
    return (
      <View style={styles.mainContainer}>
        {
        eventDetails &&
        <FlatList 
        data={eventDetails.results}
        // keyExtractor={(item,index)=>(item.title)}
        showsVerticalScrollIndicator={false}
        renderItem={this._renderItem}
        />
        }
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
      getEventData: state.getEvent, 
      user:state.user,
  }
}
const mapDispatchToProps = dispatch => 
    bindActionCreators(actions, dispatch);

export default connect(mapStateToProps,mapDispatchToProps)(Attending);
    
