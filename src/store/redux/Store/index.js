import { createStore, combineReducers, applyMiddleware } from "redux";
import { Auth } from "../Models/auth";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Auth,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};
