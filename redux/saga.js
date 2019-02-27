import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constant";
import { getRegisterRequest } from "./homePage/action";
import {getEventRequest} from './tabs/homeTab/action';
import {getCategoryRequest} from './getCategory/actions';
import {getStateAndCityRequest} from './stateAndCity/action';
import {getStateAndCityEventRequest} from './stateAndCityEvent/action';


export function* watchActions() {
  yield takeLatest(constants.GET_REGISTER_REQUEST, getRegisterRequest);
  yield takeEvery(constants.GET_EVENT_REQUEST ,getEventRequest);
  yield takeLatest(constants.GET_CATEGORY_REQUEST ,getCategoryRequest);
  yield takeLatest(constants.GET_STATEANDCITY_REQUEST ,getStateAndCityRequest);
  yield takeLatest(constants.GET_STATEANDCITYEVENT_REQUEST ,getStateAndCityEventRequest)
}

export default function* rootSaga() {
  yield all([watchActions()]);
}