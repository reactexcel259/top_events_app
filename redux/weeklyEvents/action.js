import * as actions from '../action'
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

export function* getWeeklyEventsRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "GET",
        '/getWeeklyEvents',
      );
      if (response) {
          yield put(actions.getWeeklyEventsSuccess(response.data));
      }
    } catch (e) {
      yield put(actions.getWeeklyEventsError(e.response.data));
    }
  }
  