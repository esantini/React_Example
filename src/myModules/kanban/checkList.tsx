import React, { Component } from "react";

class CheckList extends Component {
	public props: kanban.CheckList;

	public render() {
		const tasks = this.props.tasks.map((task) => (
			<li className="checklist__task" key={ task.name } >
				<input type="checkbox" defaultChecked={task.done} />
				{task.name}
				<a href="#" className="checklist__task--remove" />
			</li>
		));
		return (
			<div className="checklist">
				<ul key={ this.props.cardId }>{tasks}</ul>
			</div>
		);
	}
}

export default CheckList;
