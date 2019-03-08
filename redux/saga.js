import { takeLatest, takeEvery ,all } from "redux-saga/effects";
import * as constants from "./constant";
import { getRegisterRequest, getLoginRequest, getUserDataRequest, userPasswordRequest, userDataRequest, userForgetPasswordRequest } from "./homePage/action";
import {getEventRequest, getEventByIdRequest} from './tabs/homeTab/action';
import {getCategoryRequest} from './getCategory/actions';
import {getStateAndCityRequest} from './stateAndCity/action';
import {getStateAndCityEventRequest} from './stateAndCityEvent/action';
import {postAddCommentRequest} from './addComment/action';
import {getEventDescriptionRequest} from './getEventDescription/action';
import {postAddLikeRequest} from './addLikeOnEvent/action';
import { getInterestedEventRequest, getAttendingEventRequest, postJoiningEventsRequest} from  './interestedEvent/action';


export function* watchActions() {
  yield takeLatest(constants.GET_REGISTER_REQUEST, getRegisterRequest);
  yield takeLatest(constants.GET_LOGIN_REQUEST, getLoginRequest);
  yield takeLatest(constants.GET_USER_DATA_REQUEST, getUserDataRequest);
  yield takeLatest(constants.USER_FORGET_PASSWORD_REQUEST, userForgetPasswordRequest);
  yield takeLatest(constants.USER_DATA_REQUEST, userDataRequest);
  yield takeLatest(constants.USER_PASSWORD_REQUEST, userPasswordRequest);
  yield takeEvery(constants.GET_EVENT_REQUEST ,getEventRequest);
  yield takeLatest(constants.GET_EVENTBYID_REQUEST ,getEventByIdRequest);
  yield takeLatest(constants.GET_CATEGORY_REQUEST ,getCategoryRequest);
  yield takeLatest(constants.GET_STATEANDCITY_REQUEST ,getStateAndCityRequest);
  yield takeLatest(constants.GET_STATEANDCITYEVENT_REQUEST ,getStateAndCityEventRequest);
  yield takeLatest(constants.POST_ADDCOMMENT_REQUEST ,postAddCommentRequest);
  yield takeLatest(constants.GET_EVENTDESCRIPTION_REQUEST ,getEventDescriptionRequest);
  yield takeLatest(constants.POST_EVENT_LIKE_REQUEST ,postAddLikeRequest);
  yield takeLatest(constants.GET_INTERSTEDEVENT_REQUEST ,getInterestedEventRequest);
  yield takeLatest(constants.GET_ATTENDING_EVENT_REQUEST ,getAttendingEventRequest);
  yield takeLatest(constants.POST_JOINING_EVENTS_REQUEST ,postJoiningEventsRequest);
}

export default function* rootSaga() {
  yield all([watchActions()]);
}