import React, { Component } from "react";

class CheckList extends Component<kanban.CheckList, {}> {

	public render() {
		const tasks = this.props.tasks.map((task, taskIndex) => (
			<li className="checklist__task" key={ task.id } >
				<input type="checkbox" defaultChecked={task.done}
					onChange={
						this.props.taskCallbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)
					} />

				{task.name}
				<a className="checklist__task--remove"
					onClick={
						this.props.taskCallbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)
					}/>
			</li>
		));
		return (
			<div className="checklist">
				<ul>{tasks}</ul>
				<input type="text"
						className="checklist--add-task"
						placeholder="Type then hit Enter to add a task"
						onKeyPress={ this.checkInputKeyPress.bind(this) } />
			</div>
		);
	}

	private checkInputKeyPress(evt: React.KeyboardEvent<HTMLInputElement>) {
		if (evt.key === "Enter") {
			this.props.taskCallbacks.add(this.props.cardId, (evt.target as HTMLInputElement).value);
			(evt.target as HTMLInputElement).value = "";
		}
	}
}

export default CheckList;
