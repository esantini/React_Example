import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { selectUser } from "../actions/mainActions";

interface IProps {
	users: User[];
	selectUser?: (user: User) => Action;
}
interface IState {
	users: User[];
}

class UserList extends React.Component<IProps, IState> {
	public render() {
		return (
			<ul>
				{ this.createListItems() }
			</ul>
		);
	}

	private createListItems() {
		return this.props.users.map((user: User) => {
				return (
					<li
						key={ user.id }
						onClick={() => this.props.selectUser!(user) }>

						{user.first} {user.last}
					</li>
				);
			},
		);
	}
}

function mapStateToProps(state: IState): IProps {
	return {
		users: state.users,
	};
}

function matchDispatchToProps(dispatch: Dispatch<any>) {
	return bindActionCreators( { selectUser }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(UserList as any);
