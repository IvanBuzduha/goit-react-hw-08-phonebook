import { combineReducers, createReducer } from "@reduxjs/toolkit";
import {
  loginError,
  loginRequest,
  loginSuccess,
  logout,
  registerError,
  registerRequest,
  registerSuccess,
} from "./authActions";

const tokenReducer = createReducer(
  {},
  {
    [registerSuccess]: (_, { payload }) => payload,
    [loginSuccess]: (_, { payload }) => payload,
    [logout]: () => ({}),
  }
);
const loaderReducer = createReducer(false, {
  [registerRequest]: (state) => !state,
  [registerSuccess]: (state) => !state,
  [registerError]: (state) => !state,
  [loginSuccess]: (state) => !state,
  [loginRequest]: (state) => !state,
  [loginError]: (state) => !state,
  [logout]: () => false,
});

const errorReducer = createReducer("", {
  [registerError]: (_, { payload }) => payload,
  [loginError]: (_, { payload }) => payload,
  [logout]: () => "",
});

const authReducer = combineReducers({
  token: tokenReducer,
  isLoading: loaderReducer,
  error: errorReducer,
});
export default authReducer;
