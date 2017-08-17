import React from "react";
import { Container } from "flux/utils";
import Board from "./components/board";
import CardActionCreators from "./actions/CardActionCreators";
import CardStore from "./stores/CardStore";

interface IKanban {
	cards: kanban.Card[];
	match: { url: string };
}

class KanbanBoardContainer extends React.Component<any, any> {

	public static getStores = () => ([CardStore]);
	public static calculateState = (prevState: any) => ({
		cards: CardStore.getState(),
	})

	public componentDidMount(){
		CardActionCreators.fetchCards();
	}

	public render() {

		/* BOOKS CODE NOT WORKING
		// TODO the following results "undefined". Check book's intent here:
		const kanbanBoard = this.props.children && React.cloneElement( this.props.children, {
			cards: this.state.cards,
		});
		if (kanbanBoard === undefined) {
			console.warn("kanbanBoard is undefined");
		}
		return <div> { kanbanBoard } </div>;
		*/

		return <div className="kanban"> <Board cards={this.state.cards} /> </div>;
	}
}

import { convert } from "../utils";
export default Container.create( convert(KanbanBoardContainer) );
