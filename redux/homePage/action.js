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
  let token = action.payload;
  let header = {
      "Authorization":token
  }
  try {
     const response = yield call(fireAjax, "GET", "/user",header,'');
     if (response.data.success) {
        yield put(actions.getUserDataSuccess(response.data));
     } else {
       yield put(actions.getUserDataError(response.data));      
     }
   } catch (e) {
     yield put(actions.getUserDataError(e));
   }
}

export function* userPasswordRequest(action) { 
  let token = action.payload;
  let header = {
      "Content-Type": "application/json",
      'Authorization':token
  }
  console.log(action,'check',header)
  try {
     const response = yield call(fireAjax, "PUT", "/user/updatePassword",header,'');
    console.log(response.data,'response')
     if (response.data.success) {
        yield put(actions.userPasswordSuccess(response.data));
     } else {
       yield put(actions.userPasswordError(response.data));      
     }
   } catch (e) {
     console.log(e,'error')
     yield put(actions.userPasswordError(e));
   }
}

export function* userDataRequest(action) { 
  let token = action.payload.token;
  let id = action.payload.id;
  let header = {
      "Content-Type": "application/json",
      'Authorization':token
  }
  console.log(action,'check',header)
  try {
     const response = yield call(fireAjax, "PUT", `/user/updatePassword/${id}`,header,{
       ...action.payload.data
     });
    console.log(response.data,'response')
     if (response.data.success) {
        yield put(actions.userDataSuccess(response.data));
        yield put(actions.getUserDataRequest(token));
     } else {
       yield put(actions.userDataError(response.data));      
     }
   } catch (e) {
     console.log(e,'error')
     yield put(actions.userDataError(e));
   }
}

export function* userForgetPasswordRequest(action) { 
  let token = action.payload.token;
  let header = {
      "Content-Type": "application/json",
      'Authorization':token
  }
  console.log(action,'check',header)
  try {
     const response = yield call(fireAjax, "POST", `/forget/password`,header,'');
    console.log(response.data,'response')
     if (response.data.success) {
        yield put(actions.userForgetPasswordSuccess(response.data));
     } else {
       yield put(actions.userForgetPasswordError(response.data));
     }
   } catch (e) {
     console.log(e,'error')
     yield put(actions.userForgetPasswordError(e));
   }
}