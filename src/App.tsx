import React, { Component } from "react";
// import logo from './logo.svg'; // Use file-loader.
// import './App.css';

import Clock from "./myModules/clock";
import GroceryList from "./myModules/groceryList";
import Kanban from "./myModules/kanban/kanban";
import Toggle from "./myModules/toggle";

class App extends Component {
	public render() {
		return (
			<div className="App">
				<div className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					<h2>Welcome to React</h2>
				</div>

				<Kanban />

				<Welcome1 name="from App.tsx" />

				<Clock />

				<Toggle target="#light" />
				<div>
					<span id="light">Toggle turns me On/Off</span>
				</div>

				<GroceryList />
			</div>
		);
	}
}

/*
	As they are now Welcome1 & Welcome2 are equivalent from React's point of view.
	BUT: classes lets us use additional features such as local state and lifecycle hooks.
*/
// tslint:disable-next-line
function Welcome1(props: any) {
	return <h1>Hello, {props.name} </h1>;
}
// tslint:disable-next-line
class Welcome2 extends React.Component {
	public render() {
		return <h1>Hello, { (this.props as any).name }</h1>;
	}
}

export default App;
