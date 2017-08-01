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
