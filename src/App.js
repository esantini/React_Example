import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './myModules/clock';
import Toggle from './myModules/toggle';
import GroceryList from './myModules/groceryList';
import Kanban from './myModules/kanban/kanban';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>

				<Kanban />

				<Welcome1 name="from App.js" />

				<Clock />

				<Toggle target="#light" />
				<div >
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
// eslint-disable-next-line
function Welcome1(props) {
	return <h1>Hello, {props.name} </h1>;
}
// eslint-disable-next-line
class Welcome2 extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

export default App;
