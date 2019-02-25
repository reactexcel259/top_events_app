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

//action for separate event

export const GET_ENTERTAINMENT_EVENT="GET_ENTERTAINMENT_EVENT";
export const GET_SPORT_EVENT="GET_SPORT_EVENT";
export const GET_SHOPPING_EVENT="GET_SHOPPING_EVENT";
export const GET_HEALTHFITNESS_EVENT="GET_HEALTHFITNESS_EVENT";
export const GET_CONFERERNCE_EVENT="GET_CONFERERNCE_EVENT";
export const GET_FOOT_EVENT="GET_FOOT_EVENT";

export const getEntertainmentEventSuccess=createAction(constants.GET_ENTERTAINMENT_EVENT_SUCCESS);
export const getEntertainmentEventError=createAction(constants.GET_ENTERTAINMENT_EVENT_ERROR);

export const getSportEventSuccess=createAction(constants.GET_SPORT_EVENT_SUCCESS);
export const getSportEventError=createAction(constants.GET_SPORT_EVENT_ERROR);