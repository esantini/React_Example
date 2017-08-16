import React from "react";
import { connect } from "react-redux";

interface IProps {
	user: User;
}
interface IState {
	activeUser: User;
}

class UserDetails extends React.Component<IProps, IState> {

	public render() {
		if (!this.props.user) {
			return <h4>No User Selected</h4>;
		}
		return (
			<div>
				<img src={this.props.user.thumbnail} />
				<h2>{this.props.user.first} {this.props.user.last}</h2>
				<h3>Age: {this.props.user.age}</h3>
				<h3>Description: {this.props.user.description}</h3>
			</div>
		);
	}
}

function mapStateToProps(state: IState): IProps {
	return {
		user: state.activeUser,
	};
}

export default connect(mapStateToProps)(UserDetails as any);
