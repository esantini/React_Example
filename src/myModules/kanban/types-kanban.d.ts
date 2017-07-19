declare namespace kanban {
	interface List {
		id: string,
		title: string,
		cards: kanban.Card[],
		taskCallbacks: TaskCallbacks
	}
	interface Card {
		id: number,
		title: string,
		description: string,
		color: string,
		tasks: Task[],
		status?: string,
		taskCallbacks: TaskCallbacks,
	}
	interface Task {
		id: number,
		name: string,
		done: boolean
	}
	interface TaskCallbacks {
		toggle: Function,
		delete: Function,
		add: Function
	}
	interface CheckList {
		cardId: number,
		tasks: kanban.Task[],
		taskCallbacks: TaskCallbacks
	}
}