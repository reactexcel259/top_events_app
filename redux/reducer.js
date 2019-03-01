import { combineReducers } from "redux";
import user from "./homePage/reducer";
import navigation from "./navigation/reducer";
import getEvent from '../redux/tabs/homeTab/reducer';
import getCategory from '../redux/getCategory/reducer';
import getStateAndCity from '../redux/stateAndCity/reducer';
import getStateAndCityEvent from '../redux/stateAndCityEvent/reducer';
import postAddComment from '../redux/addComment/reducer';
import getEventDescription from '../redux/getEventDescription/reducer';


export default combineReducers({
 user:user,
 navigation:navigation,
 getEvent:getEvent,
 getCategory:getCategory,
 getStateAndCity:getStateAndCity,
 getStateAndCityEvent:getStateAndCityEvent,
 postAddComment:postAddComment,
 getEventDescription:getEventDescription
});