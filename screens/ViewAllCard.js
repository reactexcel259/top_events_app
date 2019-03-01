import React, { Component } from 'react'
import { Text, View ,FlatList ,} from 'react-native'
import Card from '../components/card';
import Touch from 'react-native-touch';
import CustomHeader from '../components/header';

export default class ViewAllCard extends Component {
    static navigationOptions = {
        header: null
      };
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
          <CustomHeader  isCenter={true} isLeft={true} goBack={()=>this.props.navigation.goBack()} leftIcon='angle-left' centerTitle="My event" />
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
