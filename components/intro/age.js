import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Picker,
  FlatList,
  StatusBar
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import Layout from '../../constants/Layout';
import { MonoText } from '../../components/StyledText';
import CustomeButton from '../button'

export default class AgePicker extends React.Component {
  renderItem = () => {
    let startAge = 18;
    let array = [];
    while(startAge < 80) {
      let item = <Picker.Item label={startAge.toString()} value={startAge} />
      array.push(item);
      startAge ++
    }
    return array;
  }
  
  render() {
    const { onPress } = this.props
    return (
      <View style={styles.mainContainer} >
        <View style={styles.headerContainer} >
          <Text style={styles.headerText} > How Old are you? </Text>
        </View>
        <View style={styles.intrestContainer} >
          <View style={{flexDirection:'row',flexWrap:'wrap'}} >
             <Picker
                // selectedValue={}
                style={{height: 50, width: 100}}
                // onValueChange={(itemValue, itemIndex) =>
                //   this.setState({language: itemValue})
                // }
                >
                {this.renderItem()}
              </Picker>
          </View>
        </View>
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:50}} >
              <CustomeButton
                buttonText={"Next"}
                gradientColor={['#FF6CC9','#8559F0']}
                textColor={'white'}
                onPress={onPress}
              />            
          </View>              
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer:{
    flex: 1
  },
  headerContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    fontWeight:'600',
    fontSize:20
  },
  intrestContainer:{
    margin:20,
    justifyContent:'space-between'
  },
  bubbleContainer:{
    margin:4,
    width:80,
    borderRadius:40,
    borderColor:'gray',
    height:40,
    alignItems:'center',
    justifyContent:'center'
  }
});
