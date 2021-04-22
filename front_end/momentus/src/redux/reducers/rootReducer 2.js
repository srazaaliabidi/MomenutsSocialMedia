import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import postReducer from "./postReducer";

/* 
Combines reducers into one for simpler importing
*/

export default combineReducers({
  loginReducer,
  postReducer
});