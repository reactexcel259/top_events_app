import React, { Component } from 'react'
import { Text, View ,Image } from 'react-native';
import Layout from '../constants/Layout';

export default class CityEventDescription extends Component {
  render() {
    return (
      <View>
          <View>
              <View>
                  <View style={styles.imageWrapper}>
                      <Image style={styles.image} source={require('../assets/images/photo2.png')}  />
                  </View>
                  <View>
                      <Text>Jamaica Carnival</Text>
                      <Text>website.com</Text>
                  </View>
                  <View>
                      <Image source={require('../assets/images/cost.png')} />
                      <View>
                          <Text>7 Dec ,Friday</Text>
                          <Text>19:00 - 22:00</Text>
                      </View>
                  </View>
                  <View>
                      <Image  source={require('../assets/images/cost.png')}/>
                      <Text>from $45</Text>
                  </View>
                  <View>
                      <Text>4.5K people interested</Text>
                  </View>
                  <View></View>
              </View>
              <View></View>
          </View>
          <View></View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    imageWrapper:{
        width:Layout.window.width,
        height:Layout.window.height/2
    },
    image:{
        width:"100%",
        height:"100%",
    }
})
