import React, { Component } from 'react';
import { Text, View ,Image ,StyleSheet} from 'react-native';
import Carousel, { Pagination } from "react-native-snap-carousel";
import Layout from '../constants/Layout';
import { FontAwesome } from '@expo/vector-icons';

export default class ImageCarousel extends Component {
    constructor() {
        super();
        this.state = {
          entries: [
            { title: require("../assets/images/photo.png")  },
            { title: require("../assets/images/photo.png") },
            { title: require("../assets/images/photo.png") },
            { title: require("../assets/images/photo.png") },
            { title: require("../assets/images/photo.png") },
            { title: require("../assets/images/photo.png") }
          ],
          activeSlide: 0
        };
      }
      pagination() {
        const { entries, activeSlide } = this.state;
        return (
          <Pagination
            dotsLength={entries.length}
            activeDotIndex={activeSlide}
            containerStyle={{
              backgroundColor: "transparent",
              position: "relative",
              bottom: 60,
              zIndex: 10
              // borderWidth: 5,
              // borderColor: "#000"
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor:"green"
            }}
            inactiveDotStyle={{
              backgroundColor: "red"
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            inactiveDotOpacity={0.4}
            carouselRef={this._carousel}
            tappableDots={!!this._carousel}
          />
        );
      }
      _renderItem({ item, index }) {
        return (
          <View style={{height:200,width:'92%'}}>
            <Image style={{flex:1,width:'100%',height:'100%'}} resizeMode='cover'
             source={item.title}
            
            />
          </View>
        );
      }
      _onPressNext = () => {
        if (this.state.activeSlide == this.state.entries.length-1) {
          this.setState({ activeSlide: this.state.entries.length-1 });
        } else {
          this.setState({ activeSlide: this.state.activeSlide + 1 });
        }
      };
      _onPressPrev = () => {
        if (this.state.activeSlide == 0) {
          this.setState({ activeSlide: 0 });
        } else {
          this.setState({ activeSlide: this.state.activeSlide - 1 });
        }
      };
      wp(percentage) {
        const value = (percentage * Layout.window.width) / 100;
        return Math.round(value);
      }
  render() {
    const slideHeight = Layout.window.height * 0.36;
    const slideWidth = this.wp(100);
    const itemHorizontalMargin = this.wp(2);

    const sliderWidth = Layout.window.width;
    const itemWidth = slideWidth + itemHorizontalMargin * .01;
    return (
      <View style={{marginBottom:-70,}}>
         <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}                         
            sliderHeight={100}
            itemWidth={itemWidth}
            itemHeight={100}
            firstItem={this.state.activeSlide}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          {this.pagination()}
          {this.state.activeSlide !== 0 && (
          <View style={styles.leftarrow}>
            <FontAwesome
              onPress={() => this._onPressPrev()}
              name="angle-left"
              color='#fff'
              size={25}
              style={styles.icon}
            />
          </View>
        )}
        {this.state.activeSlide !== 5 && (
          <View style={styles.rightarrow}>
            <FontAwesome
              onPress={() => this._onPressNext()}
              name="angle-right"
              color='#fff'
              size={25}
              style={styles.icon}
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  parentView: {
    position: "relative",
    zIndex: -10,
    bottom: 50,
    // borderWidth: 5,
    // borderColor: COLOR.PARENTVIEW,
    backgroundColor:'black'
  },
  leftarrow: {
    zIndex: 1,
    position: "absolute",
    left: 15,
    alignSelf:'center',
    top:"30%"
  },
  rightarrow: {
    zIndex: 1,
    position: "absolute",
    right: 15,
    top:"30%"
  },
  icon: {
    fontSize: 40,
    color: "white"
  }
});
