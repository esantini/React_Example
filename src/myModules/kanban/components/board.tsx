import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import List from "./list";

class Board extends React.Component<kanban.Board, {}> {

	public static propTypes = {
		cards: PropTypes.arrayOf(PropTypes.object),
	};

	public render() {
		return (
		<div className="app">
			<Link to="/new" className="float-button">+</Link>
			<List id="todo" title="To Do" cards={
					this.props.cards.filter((card) => card.status === "todo")
				} />
			<List id="in-progress" title="In Progress" cards={
					this.props.cards.filter((card) => card.status === "in-progress")
				} />
			<List id="done" title="Done" cards={
					this.props.cards.filter((card) => card.status === "done")
				} />
			{this.props.children}
			</div>
		);
	}
}

import { getHTML5Context } from "../../utils";
export default getHTML5Context()(Board) as __ReactDnd.ContextComponentClass<kanban.Board>;

// tslint:disable:max-line-length

/*

[ts]
Type '{ id: "todo"; title: "To Do"; cards: Card[]; }' is not assignable to type '(IntrinsicAttributes & IntrinsicClassAttributes<Component<List, ComponentState> | DndComponent<Li...'.
  Type '{ id: "todo"; title: "To Do"; cards: Card[]; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<Component<List, ComponentState> | DndComponent<Lis...'.
    Type '{ id: "todo"; title: "To Do"; cards: Card[]; }' is not assignable to type 'Readonly<List>'.
      Property 'taskCallbacks' is missing in type '{ id: "todo"; title: "To Do"; cards: Card[]; }'.

*/
