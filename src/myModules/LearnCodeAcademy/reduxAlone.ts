import { createStore, Action } from "redux";

interface IAction extends Action {
	payload: any;
}

const reducer = (state: number, action: IAction): number => {
	if (action.type === "INCREMENT") {
		return state + action.payload;
	}
	if (action.type === "DECREACSE") {
		return state - action.payload;
	}
	return state;
};

const store = createStore(reducer, 0);

store.subscribe(() => {
	console.log("Store updated: ", store.getState()); // 1, 3, 7, 5, 4
});

store.dispatch({type: "INCREMENT", payload: 1 }); // 1
store.dispatch({type: "INCREMENT", payload: 2 }); // 3
store.dispatch({type: "INCREMENT", payload: 4 }); // 7

store.dispatch({type: "DECREACSE", payload: 2 }); // 5
store.dispatch({type: "DECREACSE", payload: 1 }); // 4
