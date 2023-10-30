import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";


const persistConfig = {
    'key': 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// USING BUILT-IN MIDDLEWARE
// eslint-disable-next-line no-undef
const middleWare = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

// USING CUSTOM MIDDLEWARE
// const middleWare = [loggerMiddleware];

// USE REDUX DEVTOOLS
// eslint-disable-next-line no-undef
const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWare));

export const store = createStore(persistedReducer , undefined, composeEnhancers);

export const persistor = persistStore(store);


