import { combineReducers } from "redux";
import homeReducer from "./house/homeSlice";
import userReducer from "./user/userSlice";
//
export const rootReducer = combineReducers({
  house: homeReducer,
  user: userReducer,
});
