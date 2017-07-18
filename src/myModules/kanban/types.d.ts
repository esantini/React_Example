declare namespace kanban {
	interface List {
		id: string,
		title: string,
		cards: kanban.Card[]
	}
	interface Card {
		id: string,
		title: string,
		description: string,
		color: string,
		tasks: Task[],
		status?: string
	}
	interface Task {
		name: string,
		done: boolean
	}
	interface CheckList {
		cardId: string,
		tasks: kanban.Task[]
	}
}