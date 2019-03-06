import React, { Component } from 'react'
import { Text, View ,FlatList,ActivityIndicator} from 'react-native'
import Card from '../components/card';
import Touch from 'react-native-touch';
import CustomHeader from '../components/header';
import Layout from '../constants/Layout';
import {getStateAndCityRequest, getCategoryRequest} from '../redux/action';
import { connect } from "react-redux";


class ViewAllCard extends Component {
    static navigationOptions = {
        header: null
      };
    _renderItem=({item,index})=>{
        return(
            <View>
                <Touch 
                onPress={()=>this.props.navigation.navigate("CityEventDescription",{item:item})}
                >
                    <Card item={item}/>
                </Touch>
            </View>
        )
    }
  render() {
    const {register} = this.props.getEventData;
    let currentData = register.events.data !== undefined ? register.events.data.results : register.events;
    return (
      <View style={{paddingBottom:Layout.window.height*0.005, flex:1 }}>
        <CustomHeader  
          isCenter={true} 
          isLeft={true} 
          leftPress={()=>this.props.navigation.goBack()} 
          leftIcon='angle-left' 
          centerTitle="My event" 
        />
        {register.isLoading?
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="small" color="#00ff00" />
          </View>:
          <FlatList 
          data={currentData}
          keyExtractor={(item,index)=>(item.title)}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
          extraData={this.props}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    getEventData: state.getEvent,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStateAndCity:()=>dispatch(getStateAndCityRequest()),
    getCategory: () => dispatch(getCategoryRequest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)
  (ViewAllCard);