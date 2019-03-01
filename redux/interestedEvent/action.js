import * as actions from '../action';
import fireAjax from '../../services/index';
import {call,put} from "redux-saga/effects";

export function* getInterestedEventRequest(action) {
    console.log(action ,'YYYYYYYYYYYYYYYYYYYY');
    const header = {
        "Authorization":action.payload
      };
    
 try {
    const response = yield call(fireAjax, "GET", `/getInterestedEvents`,header,null);
    if (response) {
        console.log(response.data);
        
      yield put(actions.getInterestedEventSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getInterestedEventError());
  }
 }