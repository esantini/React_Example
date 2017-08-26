
import React, { Component } from "react";
import { Link, Route, BrowserRouter } from "react-router-dom";

// import logo from './logo.svg'; // Use file-loader.
// import './App.css';

import Clock from "./myModules/clock";
import ShoppingCart from "./myModules/dragNDrop/container";
import ShoppingList from "./myModules/shoppingList/shoppingList";
import Toggle from "./myModules/toggle";
import ServerError from "./serverError";
import Kanban from "./myModules/kanban/kanban";

import Bank from "./myModules/bank/BankAppComponent";

import Buckys from "./myModules/buckysRedux/index";

import MobXTimer from "./myModules/MobX/MobXample";

import "./myModules/LearnCodeAcademy/reduxAlone"; // console logs.

class App extends Component {

	public render() {
		return (
			<BrowserRouter>
				<div className="App">
					<div className="App-header">
						{/*<img src={logo} className="App-logo" alt="logo" />*/}
						<h2>Welcome to React</h2>

						<Route path="/" exact={true} render={() => (
							<h3>Home</h3>
						)} />

					</div>

					{ MobXTimer }

					<div className="routedStuff" >
						<h3>The content of this div depends on the URL:</h3>

						<menu>
							<ul style={{margin: "0", padding: "0" }}>
								<li><Link to="/">Home</Link></li>
								<li><Link to="/shoppingCart">Shopping Cart</Link></li>
								<li><Link to="/kanban">Kanban</Link></li>
								<li><Link to="/list">Shopping List</Link></li>
							</ul>
						</menu>

						<Route path="/shoppingCart" render={() => ( <h3>Drag N Drop list</h3> )} />
						<Route path="/shoppingCart" component={ShoppingCart} />

						<Route path="/kanban" render={() => (
							<h3>Kanban with data from json file(?) & pseudo CRUD functionality.</h3>
						)} />
						<Route path="/kanban" component={Kanban} />

						<Route path="/list" render={() => ( <h3>Animated Shopping List:</h3> )} />
						<Route path="/list" component={ShoppingList} />

						<Route path="/error" component={ServerError} />

					</div>

					<Buckys />

					<Bank />

					<Welcome1 name="from App.tsx" />

					<Clock />

					<Toggle target="#light" />
					<div>
						<span id="light">Toggle turns me On/Off</span>
					</div>

				</div>
			</BrowserRouter>
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
