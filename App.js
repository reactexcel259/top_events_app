import React from 'react';
import { Platform, StatusBar, StyleSheet, View, SafeAreaView } from 'react-native';
import { AppLoading, Asset, Font, Icon, SplashScreen } from 'expo';
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
  componentDidMount() {
    // SplashScreen.preventAutoHide();
  }
  render() {
      if (!this.state.isLoadingComplete) {
        return (
          <AppLoading
            startAsync={this._loadResourcesAsync}
            onError={this._handleLoadingError}
            onFinish={this._handleFinishLoading}
            autoHideSplash={false}
          />
        );
      } else {
        return (
          <SafeAreaView style={{flex:1}} >
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <Provider store={store} >
                <AppNavigator />
              </Provider>
            </View>
          </SafeAreaView>
        );
      }
    }
    _loadResourcesAsync = async () => {
      
    };
  
    _handleLoadingError = error => {
      // In this case, you might want to report the error to your error
      // reporting service, for example Sentry
      console.warn(error);
    };
  
    _handleFinishLoading = () => {
      this.setState({ isLoadingComplete: true });
    };
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
