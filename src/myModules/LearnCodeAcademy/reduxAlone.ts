import { createStore, Action, combineReducers } from "redux";

interface IAction extends Action {
	payload: any;
}

// Each reducer in it's own file.
const userReducer = (state: { [whatever: string]: any } = {}, action: IAction) => {
	return state;
};

const tweetsReducer = (state: any[] = [], action: IAction) => {
	return state;
};

const calcReducer = (state: number = 0, action: IAction): number => {
	if (action.type === "INCREMENT") {
		return state + action.payload;
	}
	if (action.type === "DECREACSE") {
		return state - action.payload;
	}
	return state;
};

const reducers = combineReducers({
	user: userReducer,
	tweets: tweetsReducer,
	calc: calcReducer,
});

const store = createStore(reducers);

store.subscribe(() => {
	console.log("Store updated: ", store.getState());
});

store.dispatch({type: "INCREMENT", payload: 1 }); // 1
store.dispatch({type: "INCREMENT", payload: 2 }); // 3
store.dispatch({type: "INCREMENT", payload: 4 }); // 7

store.dispatch({type: "DECREACSE", payload: 2 }); // 5
store.dispatch({type: "DECREACSE", payload: 1 }); // 4
