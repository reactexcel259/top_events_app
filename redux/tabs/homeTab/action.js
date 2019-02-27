import * as actions from "../../action";
import fireAjax from "../../../services/index";
import { call, put } from "redux-saga/effects";

export function* getEventRequest(action) {
  console.log(action, "<<<<<<<<<<<<<<<<<<<<<<<");
  try {
    const response = yield call(
      fireAjax,
      "GET",
      `http://ec2-18-225-32-25.us-east-2.compute.amazonaws.com:3000/api/events?categories=${
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
