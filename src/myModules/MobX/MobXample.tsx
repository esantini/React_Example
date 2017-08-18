import * as React from "react";
import * as ReactDOM from "react-dom";
import { observable } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class AppState {
	@observable public timer = 0;

	constructor() {
		setInterval(() => {
			this.timer += 1;
		}, 1000);
	}

	public resetTimer() {
		this.timer = 0;
	}
}

// tslint:disable-next-line:max-classes-per-file
@observer
class TimerView extends React.Component<{ appState: AppState }, {}> {
	public render() {
		return (
			<div>
				<button onClick={this.onReset}>
					Seconds passed: {this.props.appState.timer}
				</button>
				<DevTools />
			</div>
		);
	}

	private onReset = () => {
		this.props.appState.resetTimer();
	}
}

const appState = new AppState();
const timerView = <TimerView appState={appState} />;

export default timerView;
