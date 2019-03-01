import React, { Component } from 'react'
import { Text, View ,FlatList ,} from 'react-native'
import Card from '../components/card';
import Touch from 'react-native-touch';

export default class ViewAllCard extends Component {
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
      const eventDetails=this.props.navigation.state.params.eventDetails.results
    return (
      <View>
        <FlatList 
        data={eventDetails}
        keyExtractor={(item,index)=>(index)}
        showsVerticalScrollIndicator={false}
        renderItem={this._renderItem}
        />
      </View>
    )
  }
}
