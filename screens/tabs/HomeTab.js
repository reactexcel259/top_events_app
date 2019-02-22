import React, { Component } from 'react';
import { Text, View ,StyleSheet ,ScrollView} from 'react-native';
import VideosComponent from '../../components/VideosComponent';
import Events from '../../components/Events';
import Eventdata from '../tabs/event.json'

export default class HomeTab extends Component {
  render() {

    return (
      <ScrollView>
      <View style={styles.mainWrapper} >
          <View style={styles.kingstoneView}>
            <View style={styles.kingstoneTitle}>
                <View><Text>Events in</Text></View>
                <View style={styles.secondText}>
                  <Text style={styles.kingstonText}>Kingston</Text>
                  <View>
                    <Text style={styles.changText}>
                      Chang
                    </Text>
                    </View>
                </View>
            </View>
            <VideosComponent />
          </View>
          <View style={styles.likedView}>
            <View style={styles.EventTitleView}>
                <Text style={styles.kingstonText}>Events you might like</Text>
            </View>
            <VideosComponent />
          </View>
          <View style={styles.eventComponentView} >
              <Events eventData={Eventdata.ENTERTAINMENT} eventSectionName="ENTERTAINMENT" backgroundColor="#FF6CC9" />
          </View>
          <View style={styles.eventComponentView}  >
              <Events eventData={Eventdata.SPORT} eventSectionName="SPORT" backgroundColor="#8559F0" />
          </View> 
          <View style={styles.eventComponentView} >
              <Events eventData={Eventdata.SHOPPING} eventSectionName="SHOPPING" backgroundColor="#FEEA3F" />
          </View>
          <View style={styles.eventComponentView} >
              <Events eventData={Eventdata.HEALTHFITNESS} eventSectionName="HEALTHFITNESS" backgroundColor="#00ED7C" />
          </View>
          <View style={styles.eventComponentView} >
              <Events eventData={Eventdata.CONFERENCE} eventSectionName="CONFERENCE" backgroundColor="#00D5E4" />
          </View>
          <View style={styles.eventComponentView} >
              <Events eventData={Eventdata.FOOD} eventSectionName="FOOD" backgroundColor="#FF523E" />
          </View>
        </View>
        </ScrollView>
    )
  }
}
const styles=StyleSheet.create({
    mainWrapper:{
        flex:1,
    },
    kingstoneTitle:{
      flexDirection:'column',
      padding:15
    },
    secondText:{
      flexDirection:"row",
      justifyContent:'space-between',
    },
    kingstonText:{
      fontWeight:"bold",
      fontSize:20,
      marginBottom:5,
    },
    changText:{
      color:'#FF6CC9'
    },
    likedView:{
      marginTop:30
    },
    EventTitleView:{
      paddingLeft:15,
    },
    eventComponentView:{
    }
})