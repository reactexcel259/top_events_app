import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constant";
import { getRegisterRequest, getLoginRequest } from "./homePage/action";
import {getEventRequest} from './tabs/homeTab/action';
import {getCategoryRequest} from './getCategory/actions';
import {getStateAndCityRequest} from './stateAndCity/action';
import {getStateAndCityEventRequest} from './stateAndCityEvent/action';
import {postAddCommentRequest} from './addComment/action';
import {getEventDescriptionRequest} from './getEventDescription/action';


export function* watchActions() {
  yield takeLatest(constants.GET_REGISTER_REQUEST, getRegisterRequest);
  yield takeLatest(constants.GET_LOGIN_REQUEST, getLoginRequest);
  yield takeEvery(constants.GET_EVENT_REQUEST ,getEventRequest);
  yield takeLatest(constants.GET_CATEGORY_REQUEST ,getCategoryRequest);
  yield takeLatest(constants.GET_STATEANDCITY_REQUEST ,getStateAndCityRequest);
  yield takeLatest(constants.GET_STATEANDCITYEVENT_REQUEST ,getStateAndCityEventRequest);
  yield takeLatest(constants.POST_ADDCOMMENT_REQUEST ,postAddCommentRequest);
  yield takeLatest(constants.GET_EVENTDESCRIPTION_REQUEST ,getEventDescriptionRequest);
}

export default function* rootSaga() {
  yield all([watchActions()]);
}