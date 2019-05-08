import React from 'react';
import { View, Text, Button } from 'react-native';

export default class ErrorBoundary extends React.Component {
    constructor(props){
        super(props)
        this.state = { hasError: false,error:'',info:'' };
    }

  componentDidCatch(error,info) {
    this.setState({ hasError: true ,error,info});
  }

  render() {
      const {error,info} =this.state;
      if (this.state.hasError) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>,errorboundary");
        alert(error,info)
      return <Text>Error in Component</Text>;
    }
    return this.props.children;
  }
}