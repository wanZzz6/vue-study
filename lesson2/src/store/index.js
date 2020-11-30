// import { createStore, applyMiddleware, combineReducers } from "redux";
import {createStore, applyMiddleware, combineReducers} from "../kredux/";
// import thunk from "redux-thunk";
// import logger from "redux-logger";
import isPromise from "is-promise";
import { isFSA } from "flux-standard-action";

// 定义修改规则
function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - action.payload || 1;
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({ count: countReducer }),
  // 安装中间件
  applyMiddleware(promise, thunk, logger)
);

export default store;

// logger 中间件
function logger({ getState }) {
  return (next) => (action) => {
    console.log("-------------------------------"); //sy-log

    let prevState = getState();
    console.log("prev state", prevState); //sy-log

    const returnValue = next(action);

    let nextState = getState();
    console.log("next state", nextState); //sy-log

    console.log("-------------------------------"); //sy-log
    return returnValue;
  };
}

// thunk中间件
function thunk({ getState, dispatch }) {
  return (next) => (action) => {
    if (typeof action === "function") {
      console.log("action function"); //sy-log
      return action(dispatch, getState);
    }

    console.log("action~"); //sy-log
    return next(action);
  };
}

// promise中间件
function promise({ dispatch }) {
  return (next) => (action) => {
    if (!isFSA(action)) {
      return isPromise(action) ? action.then(dispatch) : next(action);
    }
    return isPromise(action.payload)
      ? action.payload
          .then((result) => dispatch({ ...action, payload: result }))
          .catch((error) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
}
