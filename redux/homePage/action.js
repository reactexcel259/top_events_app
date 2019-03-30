import {AsyncStorage} from 'react-native';
import * as actions from "../action"
import {BASE_URL} from "../../config/index";
import fireAjax from "../../services/index"
import {call,put} from "redux-saga/effects"
import {setItem, getItem} from '../../services/storage';

export function* getRegisterRequest(action) { 
  const header = {
    "isAppRequest":true
  };
 try {
    const response = yield call(fireAjax, "POST", "/user/register",header, {
    ...action.payload
    });

    if (response.data.success) {
        // AsyncStorage.setItem('user', JSON.stringify(response.data));
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
     const response = yield call(fireAjax, "POST", "/signin",'', {
     ...action.payload
     });
  
     if (response.data.success) {
       if(response.data.session){
        AsyncStorage.setItem('user', JSON.stringify(response.data));
       }
        yield put(actions.getLoginSuccess(response.data));
        let token = response.data.token;
        yield put(actions.getUserDataRequest(token));
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
       let interest = response.data.data.interests
        setItem("user_interest", JSON.stringify({ interest: interest}));
        yield put(actions.getUserDataSuccess(response.data));
     } else {
       yield put(actions.getUserDataError(response.data));      
     }
   } catch (e) {
     yield put(actions.getUserDataError(e));
   }
}

export function* updateUserDataRequest(action) { 
  let token = action.payload.token;
  let header = {
      "Authorization":token
  }
  try {
     const response = yield call(fireAjax, "POST", "/add/interests",header,{ ... action.payload.data});
     if (response.data) {
        yield put(actions.getUserDataRequest(token));
        yield put(actions.updateUserDataSuccess(response.data));
     } else {
       yield put(actions.updateUserDataError(response.data));      
     }
   } catch (e) {
     console.log(e)
     yield put(actions.updateUserDataError(e));
   }
}

export function* userPasswordRequest(action) { 
  let token = action.payload.token;
  let header = {
      "Content-Type": "application/json",
      'Authorization':token
  }
  try {
     const response = yield call(fireAjax, "PUT", "/user/updatePassword",header,{password:action.payload.password});
     if (response.data.success) {
        yield put(actions.userPasswordSuccess(response.data));
     } else {
       yield put(actions.userPasswordError(response.data));      
     }
   } catch (e) {
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
  try {
     const response = yield call(fireAjax, "PUT", `/user/update/${id}`,header,{
       ...action.payload.data
     });
     if (response.data.success) {
        yield put(actions.userDataSuccess(response.data));
        yield put(actions.getUserDataRequest(token));
     } else {
       yield put(actions.userDataError(response.data));      
     }
   } catch (e) {
     yield put(actions.userDataError(e));
   }
}

export function* userForgetPasswordRequest(action) { 
  try {
     const response = yield call(fireAjax, "POST", `/forget/password`,'',{
       ...action.payload
     });
     if (response.data.success) {
        yield put(actions.userForgetPasswordSuccess(response.data));
     } else {
       yield put(actions.userForgetPasswordError(response.data));
     }
   } catch (e) {
     yield put(actions.userForgetPasswordError(e));
   }
}

export function* socialLoginRequest(action) {
 try {
   const { name, email } = action.payload;
   let [first, ...last] = name.split(" ");
   last = last.join(" ");
   const response = yield call(fireAjax, "POST", "/social/login",'', {
     email,
     name: {
       first,
       last
     }
   });
   if (response) {
     if (response.data && response.data.token) {
       AsyncStorage.setItem('user', JSON.stringify(response.data));
       yield put(actions.getSocialLoginSuccess(response.data));
     } else {
       yield put(actions.getSocialLoginError());
     }
   }
 } catch (e) {
   yield put(actions.getSocialLoginError(e));
 }
}

export function* storeTokenRequest(action) { 
  let token = action.payload.token;
  let header = {
      "Content-Type": "application/json",
      'Authorization':token
  }
  try {
     const response = yield call(fireAjax, "POST", `/user/updateDeviceToken`,header,{
       ...action.payload.data
     });
     if (response) {
        yield put(actions.storeTokenSuccess(response.data));
     }
   } catch (e) {
     yield put(actions.storeTokenError(e));
   }
}