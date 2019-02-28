import * as actions from "../../action";
import fireAjax from "../../../services/index";
import { call, put } from "redux-saga/effects";

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
