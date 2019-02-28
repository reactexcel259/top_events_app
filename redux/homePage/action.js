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

    console.log(response.data,'asd')

    if (response.data.success) {
       AsyncStorage.setItem('user', JSON.stringify(response.data.data));
        yield put(actions.getRegisterSuccess(response.data));
    } else {
      yield put(actions.getRegisterError(response.data));      
    }
  } catch (e) {
    yield put(actions.getRegisterError(e));
  }
 }