import React from 'react';
import data from './data.json';
import List from './list';

class kanban extends React.Component {
	render() {
		return (
			<div className="kanban" style={{ border: '1px solid black', backgroundColor: '#eee', margin: '10px' }}>
				<List id='todo' title="To Do" cards = {
 						data.cardsList.filter( (card: kanban.Card) => card.status === "todo" )
 					} />
 				<List id='in-progress' title="In Progress" cards = {
 						data.cardsList.filter( (card: kanban.Card) => card.status === "in-progress" )
 					} />
				<List id='done' title='Done' cards = {
						data.cardsList.filter( (card: kanban.Card) => card.status === "done" )
					} />
			</div>
		);
	}
}

export default kanban;