import { combineReducers } from "redux";
import register from "./homePage/reducer";
import navigation from "./navigation/reducer";
import getEvent from '../redux/tabs/homeTab/reducer';
import getCategory from '../redux/getCategory/reducer';
import getStateAndCity from '../redux/stateAndCity/reducer';
import getStateAndCityEvent from '../redux/stateAndCityEvent/reducer';


export default combineReducers({
 register:register,
 navigation:navigation,
 getEvent:getEvent,
 getCategory:getCategory,
 getStateAndCity:getStateAndCity,
 getStateAndCityEvent:getStateAndCityEvent
});