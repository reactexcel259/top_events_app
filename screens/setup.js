import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import GetLocation from 'react-native-get-location'

import CustomeButton from '../components/button';
import CustomHeader from '../components/header';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
import Intrest from '../components/intro/intrest'
import Location from '../components/intro/location';
import Interest from '../Josn/Index';

export default class SetupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      step: 1,
      interest:Interest
    }
  }
  componentDidMount(){
    async function alertIfRemoteNotificationsDisabledAsync() {
      const { Permissions } = Expo;
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('Hey! You might want to enable notifications for my app, they are good.');
      }
    }
  }
  selectInterests = (id) => {
    let int = this.state.interest;
    if(int[id] !== undefined && int[id].selected){
      int[id]["selected"] = false ;
    }else {
      int[id]["selected"] = true ;
    }
    this.setState({interest:int})
  }
  useCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
        console.log(location);
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
  }
  onBackPress = () => {
    const { step } = this.state;
    if(step != 1) {
      this.setState({ step: step - 1 });
    } else {
      this.props.navigation.goBack();
    }
  }
  render() {
    const { step, interest } =this.state
    return (
      <View style={styles.container}>
        <CustomHeader
          step={step}
          isLeft={true}
          leftIcon={'angle-left'}
          leftPress={this.onBackPress}
        />
        {
          step == 1 &&
          <Intrest 
            data={interest}
            onPress={()=>{ this.setState({step: step + 1}) }}
            selectInterests={(id)=>{this.selectInterests(id)}}
          />
        }
        {
          step == 2 &&
          <Location 
            {...this.props}
            {...this.state}
            useCurrentLocation={()=>{this.useCurrentLocation()}}
            onPress={()=>{ console.log('navigate') }}            
          />
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
});
