import * as actions from '../action'
import fireAjax from '../../services/index';
import { call, put } from "redux-saga/effects";

export function* getPastEventsRequest(action) {
    try {
      const response = yield call(
        fireAjax,
        "GET",
        '/getPastEvents',
      );
      if (response) {
          yield put(actions.getPastEventsSuccess(response.data));
      }
    } catch (e) {
      yield put(actions.getPastEventsError(e.response.data));
    }
  }
  