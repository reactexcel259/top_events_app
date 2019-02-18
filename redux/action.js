import {createAction} from 'redux-actions';
import * as constants from './constant';

//General Action 
export const openInvestModel= createAction(constants.OPEN_INVEST_MODAL);
//action for register
export const getRegisterRequest=createAction(constants.GET_REGISTER_REQUEST);
export const getRegisterSuccess=createAction(constants.GET_REGISTER_SUCCESS);
export const getRegisterError=createAction(constants.GET_REGISTER_ERROR);