import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Clock from './myModules/clock';

class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>

				<Welcome name="from App.js" />

				<Clock />

			</div>
		);
	}
}

class Welcome extends React.Component {
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

export default App;
