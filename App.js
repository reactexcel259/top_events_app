import React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {store} from './redux/store';
import { Provider } from "react-redux";


XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function(uri, options, ...args) {
  return global._fetch(uri, options, ...args).then(response => {
    console.log("Fetch", { request: { uri, options, ...args }, response });
    return response;
  });
};

// global.FormData = global.originalFormData;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }; 

  render() {
     return (
      <SafeAreaView style={{flex:1}} >
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store} >
          <AppNavigator />
        </Provider>
      </View>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
