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
      `/event/${date}`,
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

// export function* getLikeEventRequest(action) {
//   console.log("getLikeEventRequest",action.payload);
  
//   const header = {
//       "Authorization":action.payload.token
//     };
//   try {
//     const response = yield call(
//       fireAjax,
//       "GET",
//       '/getEventsByInterests',
//       header
//     );
//     if (response) {
//       console.log("getLikeEventRequest",response);
      
//       yield put(actions.getLikeEventSuccess(response.data));
//     }
//   } catch (e) {
//     yield put(actions.getLikeEventError(e));
//   }
// }

// export function* getWeeklyEventsRequest(action) {
//   try {
//     const response = yield call(
//       fireAjax,
//       "GET",
//       '/getWeeklyEvents',
//     );
//     if (response) {
//       yield put(actions.getCategorySuccess(response.data));
//     }
//   } catch (e) {
//     yield put(actions.getWeeklyEventsError(e));
//   }
// }