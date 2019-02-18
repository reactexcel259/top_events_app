import { combineReducers } from "redux";
import register from "./homePage/reducer";
import navigation from "./navigation/reducer";


export default combineReducers({
 register:register,
 navigation:navigation
});