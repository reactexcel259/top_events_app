import { createStore, applyMiddleware } from "redux";
import combineReducers from "./reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
import logger from "redux-logger";

const middleware = [];
const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

export const store = createStore(combineReducers, applyMiddleware(...middleware));

sagaMiddleware.run(rootSaga);