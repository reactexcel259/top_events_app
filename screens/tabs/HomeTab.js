import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import VideosComponent from "../../components/VideosComponent";
import Events from "../../components/Events";
import Eventdata from "../tabs/event.json";
import CustomHeader from ".././../components/header";
import { connect } from "react-redux";
import { getEventRequest, getCategoryRequest } from "../../redux/action";

class HomeTab extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isCategoryId: false,
    };
  }

  async componentDidMount() {
    await this.props.getCategory();
  }

  async componentDidUpdate() {
    const { getCategoryData } = this.props;
    if (getCategoryData.isSuccess && !this.state.isCategoryId) {
      getCategoryData.status.data.forEach(eventId => {
        let id = eventId._id;
        let key = eventId.key;
        this.props.getEvent({ id, key });
      });
      this.setState({ isCategoryId: true });
    }
  }
  render() {
    const eventsLength = this.props.getEventData.register.eventData.length;
    const events = this.props.getEventData.register.eventData;
    console.log(this.props.getEventData.register, "JJJJJ");

    return (
      <View>
        <CustomHeader isCenter={true} centerImage={true} centerTitle={true} />
        <ScrollView>
          <View style={styles.mainWrapper}>
            <View style={styles.kingstoneView}>
              <View style={styles.kingstoneTitle}>
                <View>
                  <Text>Events in</Text>
                </View>
                <View style={styles.secondText}>
                  <Text style={styles.kingstonText}>Kingston</Text>
                  <View>
                    <Text style={styles.changText}>Chang</Text>
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
            <View style={styles.eventComponentView}>
              {eventsLength == 6 &&
                events.map((event, index) => {
                  let cetegoryId;
                  let backgroundColor;
                  console.log(event, "OOOOOOOOOOOO");
                  if (Object.keys(event).join() === "shopping") {
                    backgroundColor = "#8559F0";
                  } else if (Object.keys(event).join() === "sport") {
                    backgroundColor = "#FEEA3F";
                  } else if (Object.keys(event).join() === "food") {
                    backgroundColor = "#FF523E";
                  } else if (Object.keys(event).join() === "conferences") {
                    backgroundColor = "#00D5E4";
                  } else if (Object.keys(event).join() === "health_wellness") {
                    backgroundColor = "#00ED7C";
                  } else {
                    backgroundColor = "#FF6CC9";
                  }
                  return (
                    <Events
                      key={index}
                      eventData={event[Object.keys(event).join()].data}
                      categoryId={Object.keys(event).join()}
                      backgroundColor={backgroundColor}
                    />
                  );
                })}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, ">>>>>>>>>>>>>>>>>>>>>");

  return {
    getCategoryData: state.getCategory,
    getEventData: state.getEvent
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvent: (eventId, eventKey) =>
      dispatch(getEventRequest(eventId, eventKey)),
    getCategory: () => dispatch(getCategoryRequest())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1
  },
  kingstoneTitle: {
    flexDirection: "column",
    padding: 15
  },
  secondText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  kingstonText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5
  },
  changText: {
    color: "#FF6CC9"
  },
  likedView: {
    marginTop: 30
  },
  EventTitleView: {
    paddingLeft: 15
  },
  eventComponentView: {
    paddingBottom:90
  }
});
