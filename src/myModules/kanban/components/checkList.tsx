import PropTypes from "prop-types";
import React, { Component } from "react";

import TaskActionCreators from "../actions/TaskActionCreators";

class CheckList extends Component<kanban.CheckList, {}> {

	public static propTypes = {
		cardId: PropTypes.number,
		tasks: PropTypes.arrayOf(PropTypes.object),
	};

	public render() {
		const tasks = this.props.tasks.map((task, taskIndex) => (
			<li className="checklist__task" key={ task.id } >
				<input type="checkbox"
					checked={task.done}
					onChange={
						TaskActionCreators.toggleTask.bind(null, this.props.cardId, task, taskIndex)
					} />
				{task.name}{" "}
				<a className="checklist__task--remove"
					onClick={
						TaskActionCreators.deleteTask.bind(null, this.props.cardId, task, taskIndex)
					} />
			</li>
		));
		return (
			<div className="checklist">
				<ul>{tasks}</ul>
				<input type="text"
					className="checklist--add-task"
					placeholder="Type then hit Enter to add a task"
					onKeyPress={this.checkInputKeyPress.bind(this)} />
			</div>
		);
	}

	private checkInputKeyPress(evt: React.KeyboardEvent<HTMLInputElement>) {
		if (evt.key === "Enter") {
			const newTask = { id: Date.now(), name: (evt.target as HTMLInputElement).value, done: false };
			TaskActionCreators.addTask(this.props.cardId, newTask);
			(evt.target as HTMLInputElement).value = "";
		}
	}

}

export default CheckList;
