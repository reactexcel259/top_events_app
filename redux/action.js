import {createAction} from 'redux-actions';
import * as constants from './constant';

//General Action 
export const openInvestModel= createAction(constants.OPEN_INVEST_MODAL);
//action for register
export const getRegisterRequest=createAction(constants.GET_REGISTER_REQUEST);
export const getRegisterSuccess=createAction(constants.GET_REGISTER_SUCCESS);
export const getRegisterError=createAction(constants.GET_REGISTER_ERROR);
//action for events

export const getEventRequest=createAction(constants.GET_EVENT_REQUEST);
export const getEventSuccess=createAction(constants.GET_EVENT_SUCCESS);
export const getEventError=createAction(constants.GET_EVENT_ERROR);

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