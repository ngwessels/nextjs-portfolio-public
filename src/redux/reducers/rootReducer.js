// redux/rootReducer.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Components (assuming these are now slices)
import pageLoadingReducer from "./pageLoading";
import historyReducer from "./history";
import navigationReducer from "./navigation";
import userReducer from "./user";
import messagesReducer from "./messages";
import mediaUploadReducer from "./mediaUpload";
import routeReducer from "./route";
import githubReducer from "./github";

// Combine reducers
const rootReducer = combineReducers({
  pageLoading: pageLoadingReducer,
  routerHistory: historyReducer,
  navigation: navigationReducer,
  user: userReducer,
  messages: messagesReducer,
  mediaUpload: mediaUploadReducer,
  route: routeReducer,
  github: githubReducer
});

// Create store
export const store = configureStore({
  reducer: rootReducer
  // Middleware is included by default with Redux Toolkit (includes redux-thunk)
  // You can customize it if needed:
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
  // Enable devTools in development
});

export default store;
