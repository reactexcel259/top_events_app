import { combineReducers } from "redux";
import register from "./homePage/reducer";
import navigation from "./navigation/reducer";
import getEvent from '../redux/tabs/homeTab/reducer';
import getCategory from '../redux/getCategory/reducer';


export default combineReducers({
 register:register,
 navigation:navigation,
 getEvent:getEvent,
 getCategory:getCategory
});