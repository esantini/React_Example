import PropTypes from "prop-types";
import React from "react";

interface ITarget extends EventTarget {
	value: any;
}
interface IEvent extends Event {
	target: ITarget;
}

class CardForm extends React.Component {

	public static propTypes = {
		buttonLabel: PropTypes.string.isRequired,
		draftCard: PropTypes.shape({
			title: PropTypes.string,
			description: PropTypes.string,
			status: PropTypes.string,
			color: PropTypes.string,
		}).isRequired,
		handleChange: PropTypes.func.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		handleClose: PropTypes.func.isRequired,
	};

	public props: {
		handleChange: (field: any, e: IEvent) => any;
		handleClose: (e?: Event) => any;
		handleSubmit: () => any;
		draftCard: kanban.Card;
		buttonLabel: string;
	};

	public render() {
		return (
			<div className="cardFormWrapper" >
				<div className="card big">
					<form onSubmit={this.props.handleSubmit.bind(this)}>
						<input type="text"
								value={this.props.draftCard.title}
								onChange={this.handleChange.bind(this, "title")}
								placeholder="Title"
								required={true}
								autoFocus={true} />

						<textarea value={this.props.draftCard.description}
								onChange={this.handleChange.bind(this, "description" )}
								placeholder="Description"
								required={true} />

						<label htmlFor="status">Status</label>
						<select id="status"
								value={ this.props.draftCard.status } >
							<option value="todo">To Do</option>
							<option value="in-progress">In Progress</option>
							<option value="done">Done</option>
						</select>
						<br />
						<label htmlFor="color">Color</label>
						<input id="color"
								value={this.props.draftCard.color}
								onChange={this.handleChange.bind(this, "color")}
								type="color"
								defaultValue="#ff0000" />

						<div className="actions">
							<button type="submit">{this.props.buttonLabel}</button>
						</div>
					</form>
				</div>
				<div className="overlay" onClick={this.handleClose.bind(this)}>
				</div>
			</div>
		);
	}

	public handleChange(field: any, e: IEvent) {
		this.props.handleChange(field, e.target.value);
	}

	public handleClose(e: Event) {
		e.preventDefault();
		this.props.handleClose();
	}

}

export default CardForm;
