declare namespace kanban {
	interface List {

	}
	interface Card {
		status: string
	}
	interface Task {
		name: string,
		done: boolean
	}
}