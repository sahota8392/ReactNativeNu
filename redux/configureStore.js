import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { campsites } from './campsites';
import { comments } from './comments';
import { promotions } from './promotions';
import { partners } from './partners';
import { favorites } from './favorites';
import {persistStore, persistCombineReducers } from 'redux-persist';        //expo install redux-persist@5.9.1 first then import 
import storage from 'redux-persist/es/storage';                             //access to local storage on device

const config = {
    key: 'root',                            //key is required and storage which set to the storage object we imported (default is local storage)
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {            //replaced combineReducers with the persist  -- handles updaing to local storage
            campsites,
            comments,
            partners,
            promotions,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);          //enables store to be persisted and we use this in App.js

    return { persistor, store };
};