import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducers } from "../reducers/rootReducers";

const enviroment = process.env.REACT_APP_ENV
console.log(enviroment)
console.log(enviroment)


const composeEnhancers = 
( enviroment !=='production' &&
	typeof window !== 'undefined' && 
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

export const store = createStore(
	rootReducers,
	composeEnhancers(
		applyMiddleware( thunk )
	)

);