import React, { Component } from 'react'
import { Text, View ,FlatList ,} from 'react-native'
import Card from '../components/card';
import Touch from 'react-native-touch';
import CustomHeader from '../components/header';
import Layout from '../constants/Layout';

export default class ViewAllCard extends Component {
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
      const eventDetails=this.props.navigation.state.params.eventDetails.results
    return (
      <View style={{paddingBottom:Layout.window.height*.15 }}>
        <CustomHeader  
          isCenter={true} 
          isLeft={true} 
          leftPress={()=>this.props.navigation.goBack()} 
          leftIcon='angle-left' 
          centerTitle="My event" 
        />
        <FlatList 
        data={eventDetails}
        keyExtractor={(item,index)=>(item.title)}
        showsVerticalScrollIndicator={false}
        renderItem={this._renderItem}
        />
      </View>
    )
  }
}
