import React, { Component } from "react";
// import logo from './logo.svg'; // Use file-loader.
// import './App.css';

import Clock from "./myModules/clock";
import ShoppingCart from "./myModules/dragNDrop/container";
import Kanban from "./myModules/kanban/kanban";
import KanbanOnline from "./myModules/kanbanOnline";
import ShoppingList from "./myModules/shoppingList/shoppingList";
import Toggle from "./myModules/toggle";

import myKanbanData from "./myModules/kanban/data.json";

interface IState {
	route: string;
}

class App extends Component {

	public state: IState;

	public constructor() {
		super(...arguments);
		this.state = {
			route: window.location.hash.substr(1),
		};
	}

	public componentDidMount() {
		window.addEventListener("hashchange", () => {
			this.setState({
				route: window.location.hash.substr(1),
			});
		});
	}

	public render() {

		let Child;
		switch (this.state.route) {
			case "/kanban": {
				Child = <Kanban cards={ myKanbanData.cardsList } />;
				break;
			}
			case "/list": Child = <ShoppingList />; break;
			default: Child = <ShoppingCart />;
		}

		return (
			<div className="App">
				<div className="App-header">
					{/*<img src={logo} className="App-logo" alt="logo" />*/}
					<h2>Welcome to React</h2>
				</div>

				<div className="routedStuff" >
					<h3>The content of this div depends on the URL:</h3>
					<menu>
						<ul style={{margin: "0", padding: "0" }}>
							<li><a href="#/shoppingCart">Shopping Cart</a></li>
							<li><a href="#/kanban">Kanban</a></li>
							<li><a href="#/list">Shopping List</a></li>
						</ul>
					</menu>
					{Child}
				</div>

				<h3>Drag N Drop list</h3>
				<ShoppingCart />

				<hr />
				<h3>Animated Shopping List:</h3>
				<ShoppingList />

				<hr />
				<h3>Kanban with data from json file & pseudo CRUD functionality.</h3>
				<Kanban cards={ myKanbanData.cardsList } />

				<div style={{ border: "1px solid black", margin: "20px", backgroundColor: "beige" }}>
					<h3>This gets the Kanban Data from a CORS requests.</h3>
					<h4>CORS: Cross Origin Resource Sharing</h4>
					{/* <KanbanOnline /> */}
				</div>

				<Welcome1 name="from App.tsx" />

				<Clock />

				<Toggle target="#light" />
				<div>
					<span id="light">Toggle turns me On/Off</span>
				</div>

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
