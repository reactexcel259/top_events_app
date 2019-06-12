import { combineReducers } from "redux";
import user from "./homePage/reducer";
import navigation from "./navigation/reducer";
import getEvent from '../redux/tabs/homeTab/reducer';
import getCategory from '../redux/getCategory/reducer';
import getStateAndCity from '../redux/stateAndCity/reducer';
import getStateAndCityEvent from '../redux/stateAndCityEvent/reducer';
import postAddComment from '../redux/addComment/reducer';
import getEventDescription from '../redux/getEventDescription/reducer';
import postAddLikeEvent from '../redux/addLikeOnEvent/reducer';
import getInterestedEvent from '../redux/interestedEvent/reducer';
import notification from '../redux/notification/reducer';
import interest from '../redux/interest/reducer';
import weeklyEvents from '../redux/weeklyEvents/reducer';
import pastEvents from '../redux/pastEvents/reducer';
import userInterestBaseEvents from '../redux/userInterestBaseEvents/reducer';
import forgotPassword from "../redux/forgotPassword/reducer";
import updateUserInterest from '../redux/homePage/updateUserInterest';


export default combineReducers({
 user:user,
 navigation:navigation,
 getEvent:getEvent,
 notification:notification,
 interest:interest,
 getCategory:getCategory,
 getStateAndCity:getStateAndCity,
 getStateAndCityEvent:getStateAndCityEvent,
 postAddComment:postAddComment,
 getEventDescription:getEventDescription,
 postAddLikeEvent:postAddLikeEvent,
 getInterestedEvent:getInterestedEvent,
 weeklyEvents:weeklyEvents,
 pastEvents:pastEvents,
 userInterestBaseEvents:userInterestBaseEvents,
 forgotPassword:forgotPassword,
 updateUserInterest:updateUserInterest,
});