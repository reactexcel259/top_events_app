import {createAction} from 'redux-actions';
import * as constants from './constant';

//General Action 
export const closeSuccessModel= createAction(constants.CLOSE_SUCCESS_MODAL);
//action for register
export const getRegisterRequest=createAction(constants.GET_REGISTER_REQUEST);
export const getRegisterSuccess=createAction(constants.GET_REGISTER_SUCCESS);
export const getRegisterError=createAction(constants.GET_REGISTER_ERROR);
//action for login
export const getLoginRequest=createAction(constants.GET_LOGIN_REQUEST);
export const getLoginSuccess=createAction(constants.GET_LOGIN_SUCCESS);
export const getLoginError=createAction(constants.GET_LOGIN_ERROR);

//action for update user password
export const userPasswordRequest=createAction(constants.USER_PASSWORD_REQUEST);
export const userPasswordSuccess=createAction(constants.USER_PASSWORD_SUCCESS);
export const userPasswordError=createAction(constants.USER_PASSWORD_ERROR);

//action for update user data
export const userDataRequest=createAction(constants.USER_DATA_REQUEST);
export const userDataSuccess=createAction(constants.USER_DATA_SUCCESS);
export const userDataError=createAction(constants.USER_DATA_ERROR);

//action for forget password
export const userForgetPasswordRequest=createAction(constants.USER_FORGET_PASSWORD_REQUEST);
export const userForgetPasswordSuccess=createAction(constants.USER_FORGET_PASSWORD_SUCCESS);
export const userForgetPasswordError=createAction(constants.USER_FORGET_PASSWORD_ERROR);

//action for user data
export const getUserDataRequest=createAction(constants.GET_USER_DATA_REQUEST);
export const getUserDataSuccess=createAction(constants.GET_USER_DATA_SUCCESS);
export const getUserDataError=createAction(constants.GET_USER_DATA_ERROR);

//action for events

export const getEventRequest=createAction(constants.GET_EVENT_REQUEST);
export const getEventSuccess=createAction(constants.GET_EVENT_SUCCESS);
export const getEventError=createAction(constants.GET_EVENT_ERROR);

//action for EventsById
export const getEventByIdRequest=createAction(constants.GET_EVENTBYID_REQUEST);
export const getEventByIdSuccess=createAction(constants.GET_EVENTBYID_SUCCESS);
export const getEventByIdError=createAction(constants.GET_EVENTBYID_ERROR);

//action for getCategory

export const getCategoryRequest=createAction(constants.GET_CATEGORY_REQUEST);
export const getCategorySuccess=createAction(constants.GET_CATEGORY_SUCCESS);
export const getCategoryError=createAction(constants.GET_CATEGORY_ERROR);

//action for state&city
export const getStateAndCityRequest=createAction(constants.GET_STATEANDCITY_REQUEST);
export const getStateAndCitySuccess=createAction(constants.GET_STATEANDCITY_SUCCESS);
export const getStateAndCityError=createAction(constants.GET_STATEANDCITY_ERROR);

//action for state&cityevent
export const getStateAndCityEventRequest=createAction(constants.GET_STATEANDCITYEVENT_REQUEST);
export const getStateAndCityEventSuccess=createAction(constants.GET_STATEANDCITYEVENT_SUCCESS);
export const getStateAndCityEventError=createAction(constants.GET_STATEANDCITYEVENT_ERROR);


//action for addcomment
export const postAddCommentRequest=createAction(constants.POST_ADDCOMMENT_REQUEST);
export const postAddCommentSuccess=createAction(constants.POST_ADDCOMMENT_SUCCESS);
export const postAddCommentError=createAction(constants.POST_ADDCOMMENT_ERROR);

//action for eventDescription
export const getEventDescriptionRequest=createAction(constants.GET_EVENTDESCRIPTION_REQUEST);
export const getEventDescriptionSuccess=createAction(constants.GET_EVENTDESCRIPTION_SUCCESS);
export const getEventDescriptionError=createAction(constants.GET_EVENTDESCRIPTION_ERROR);

//action for event like

export const postEventLikeRequest=createAction(constants.POST_EVENT_LIKE_REQUEST);
export const postEventLikeSuccess=createAction(constants.POST_EVENT_LIKE_SUCCESS);
export const postEventLikeError=createAction(constants.POST_EVENT_LIKE_ERROR);

//action for interested events

export const getInterestedEventRequest=createAction(constants.GET_INTERSTEDEVENT_REQUEST);
export const getInterestedEventSuccess=createAction(constants.GET_INTERSTEDEVENT_SUCCESS);
export const getInterestedEventError=createAction(constants.GET_INTERSTEDEVENT_ERROR);

//action for attending events 

export const getAttendingEventRequest=createAction(constants.GET_ATTENDING_EVENT_REQUEST);
export const getAttendingEventSuccess=createAction(constants.GET_ATTENDING_EVENT_SUCCESS);
export const getAttendingEventError=createAction(constants.GET_ATTENDING_EVENT_ERROR);

