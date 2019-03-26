import * as actions from "../../action";
import fireAjax from "../../../services/index";
import { call, put } from "redux-saga/effects";
import moment from 'moment';

export function* getEventRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `/events?categories=${
        action.payload.id
      }`,
      {
        ...action.payload
      }
    );
    if (response) {
      yield put(actions.getEventSuccess({[action.payload.key]: response.data}));
    }
  } catch (e) {
    yield put(actions.getEventError());
  }
}

export function* getTodayEventRequest(action) {
  let date = moment().format('YYYY-MM-DD');
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `/event/${date}?days=7`,
    );
    if (response) {
      yield put(actions.getTodayEventSuccess(response.data));
    }
  } catch (e) {
    yield put(actions.getTodayEventError(e));
  }
}

export function* getEventByIdRequest(action) {
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `/events?categories=${
        action.payload.id
      }`,
      {
        ...action.payload
      }
    );
    if (response) {
      yield put(actions.getEventByIdSuccess({event:response.data}));
    }
  } catch (e) {
    yield put(actions.getEventByIdError());
  }
}