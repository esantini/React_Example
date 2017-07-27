import React from "react";

interface IStyles {
	root: React.CSSProperties;
	alert: React.CSSProperties;
}

const styles: IStyles = {
	root: {
		textAlign: "center",
	},
	alert: {
		fontSize: 80,
		fontWeight: "bold",
		color: "#e9ab2d",
	},
};

class ServerError extends React.Component {

	public render() {
		return (
			<div style={styles.root} >
				<div style={styles.alert} >&#9888;</div>
				{/* &#9888; is the html entity code for the warning character: ⚠ */}
				<h1>Opps, we have a problem</h1>
				<p>Please try again in a few moments.</p>
			</div>
		);
	}
}

export default ServerError;
