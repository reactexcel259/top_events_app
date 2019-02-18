import { takeLatest } from "redux-saga/effects";
import * as constants from "./constant";
import { getRegisterRequest } from "./homePage/action";


export function* watchActions() {
  yield takeLatest(constants.GET_REGISTER_REQUEST, getRegisterRequest);
}

export default function* rootSaga() {
  yield [watchActions()];
}