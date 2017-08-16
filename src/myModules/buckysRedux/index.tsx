import React from "react";
import RactDOM from "react-dom";
import { createStore, Reducer } from "redux";
import { Provider } from "react-redux";

import allReducers from "./reducers/AllReducers";

import UserList from "./containers/user-list";
import UserDetails from "./containers/user-detail";

const store =  createStore(allReducers);

class Buckys extends React.Component<{}, {}> {
	public render() {
		return (
			<Provider store={store} >
				<div>
					<h2>Thenewboston's Redux Tutorial</h2>

					<UserList />

					<hr />
					<UserDetails />
				</div>
			</Provider>
		);
	}
}

export default Buckys;
