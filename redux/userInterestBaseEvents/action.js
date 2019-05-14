import * as actions from '../action';
import fireAjax from '../../services';
import {call,put} from "redux-saga/effects";

export function* getLikeEventRequest(action) {
    const header = {
        "Authorization":action.payload.token
      };
    try {
      const response = yield call(
        fireAjax,
        "GET",
        '/getEventsByInterests',
        header
      );
      if (response) {
        yield put(actions.getLikeEventSuccess(response.data));
      }
    } catch (e) {
      yield put(actions.getLikeEventError(e));
    }
  }