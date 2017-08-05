import * as ReactDnD from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

let dndContext:
		<P>(
			componentClass: React.ComponentClass<P> | React.StatelessComponent<P>,
		) => ReactDnD.ContextComponentClass<P>;
/**
 * Centralized single DnDContext with HTML5Backend.
 * Because of Uncaught Error: Cannot have two HTML5 backends at the same time.
 * 		at HTML5Backend.setup (HTML5Backend.js:88)
 */
export const getHTML5Context = () => {
	if (!dndContext) {
		dndContext = ReactDnD.DragDropContext(HTML5Backend);
	}
	return dndContext;
};

export const throttle = (func: () => any, wait?: number) => {

	let context: any, args, prevArgs: IArguments, argsChanged, result: any;
	let previous: number = 0;
	return function(this: any) {
		let now: number, remaining: number;
		if (wait) {
			now = Date.now();
			remaining = wait - (now - previous);
		}
		context = this;
		args = arguments;
		argsChanged = JSON.stringify(args) !== JSON.stringify(prevArgs);
		prevArgs = Object.assign({}, args);
		if (argsChanged || wait && (remaining! <= 0 || remaining! > wait)) {
			if (wait) {
				previous = now!;
			}
			result = func.apply(context, args);
			context = args = null;
		}
		return result;
	};
};
