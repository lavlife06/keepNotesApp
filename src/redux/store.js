import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// import thunk from 'redux-thunk';
import rootReducer from "./reducers";
// import setAuthToken from './utils/setAuthToken';

// const middleware = [thunk];
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware())
);

export const persistor = persistStore(store);
