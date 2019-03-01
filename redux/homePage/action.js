import {AsyncStorage} from 'react-native';
import * as actions from "../action"
import {BASE_URL} from "../../config/index";
import fireAjax from "../../services/index"
import {call,put} from "redux-saga/effects"

export function* getRegisterRequest(action) { 
 try {
    const response = yield call(fireAjax, "POST", "/user/register",'', {
    ...action.payload
    });

    if (response.data.success) {
        AsyncStorage.setItem('user', JSON.stringify(response.data));
        yield put(actions.getRegisterSuccess(response.data));
    } else {
      yield put(actions.getRegisterError(response.data));      
    }
  } catch (e) {
    yield put(actions.getRegisterError(e));
  }
}

export function* getLoginRequest(action) { 
  try {
     const response = yield call(fireAjax, "POST", "/social/login",'', {
     ...action.payload
     });
  
     if (response.data.success) {
        AsyncStorage.setItem('user', JSON.stringify(response.data));
        yield put(actions.getLoginSuccess(response.data));
     } else {
       yield put(actions.getLoginError(response.data));      
     }
   } catch (e) {
     yield put(actions.getLoginError(e));
   }
}

export function* getUserDataRequest(action) { 
  let token = action.payload.token;
  let header = {
    headers: {
      'Authorization':token
    }
  }
  try {
     const response = yield call(fireAjax, "POST", "/social/login",header,);
  
     if (response.data.success) {
        yield put(actions.getUserDataSuccess(response.data));
     } else {
       yield put(actions.getUserDataError(response.data));      
     }
   } catch (e) {
     yield put(actions.getUserDataError(e));
   }
}