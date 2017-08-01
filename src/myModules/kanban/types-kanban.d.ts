declare namespace kanban {
	interface Board {
		cards: Card[],
		taskCallbacks: TaskCallbacks,
		cardCallbacks: CardCallbacks,
	}
	interface List {
		id: string,
		title: string,
		cards: kanban.Card[],
		taskCallbacks: TaskCallbacks,
		cardCallbacks: CardCallbacks
	}
	interface Card {
		id: number,
		title: string,
		description: string,
		color: string,
		tasks: Task[],
		status?: string,
		taskCallbacks: TaskCallbacks,
		cardCallbacks: CardCallbacks,
		connectDragSource: Function,
		connectDropTarget: Function
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
	interface CardCallbacks {
		addCard: Function,
		updateCard: Function,
		updateStatus: Function,
		updatePosition: Function,
		persistCardDrag: Function,
	}
	interface CheckList {
		cardId: number,
		tasks: kanban.Task[],
		taskCallbacks: TaskCallbacks
	}
}