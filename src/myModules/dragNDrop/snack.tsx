import PropTypes from "prop-types";
import React from "react";
import * as ReactDnD from "react-dnd";

interface IProps {
	name: string;
	isDragging?: boolean;
	connectDragSource?: any;
}

/**
 * Snack Drag'nDrop spec
 *
 *  - Required: beginDrag
 *  - Optional: endDrag
 *  - Optional: canDrag
 *  - Optional: isDragging
 */
const snackSpec: ReactDnD.DragSourceSpec<IProps> = {
	beginDrag( props: IProps ) {
		return {
			name: props.name,
		};
	},

	endDrag(props: IProps, monitor: ReactDnD.DragSourceMonitor) {
		const dragItem = monitor.getItem() as IProps;
		const dropResult = monitor.getDropResult() as IProps;

		if (dropResult) {
			console.log(`You dropped ${dragItem.name} into ${dropResult.name}`);
		}
	},
};

/**
 * Snack DragSource collect collecting function.
 *  - connect: An instance of DragSourceConnector.
 * 		You use it to assign the drag source role to a DOM node.
 *
 *  - monitor: An instance of DragSourceMonitor.
 * 		You use it to connect state from the React DnD to your component's properties.
 * 		Availabel functions to get state include canDrag(), isDragging(), getItemType(),
 * 		getItem(), didDrop() etc.
 */
const collect = (connect: ReactDnD.DragSourceConnector, monitor: ReactDnD.DragSourceMonitor) => {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
};

class Snack extends React.Component<IProps, {}> {

	public static propTypes = {
		name: PropTypes.string.isRequired,
		isDragging: PropTypes.bool.isRequired,
		connectDragSource: PropTypes.func.isRequired,
	};

	public render() {

		const { name, isDragging, connectDragSource } = this.props;
		const opacity = isDragging ? 0.4 : 1;

		const style = {
			// tslint:disable-next-line:object-literal-shorthand
			opacity: opacity,
		};

		return connectDragSource(
			<div className="snack" style={style} >
				{name}
			</div>,
		);
	}
}

export default ReactDnD.DragSource("snack", snackSpec, collect)(Snack as any); // :(
