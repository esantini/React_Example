import AppDispatcher from "../../../AppDispatcher";
import constants from "../constants";
import KanbanAPI from "../api/KanbanApi";

const TaskActionCreators = {
	addTask(cardId: number, task: kanban.Task) {
		AppDispatcher.dispatchAsync(KanbanAPI.addTask(cardId, task), {
			request: constants.CREATE_TASK,
			success: constants.CREATE_TASK_SUCCESS,
			failure: constants.CREATE_TASK_ERROR,
		}, {cardId, task});
	},

	deleteTask(cardId: number, task: kanban.Task, taskIndex: number) {
		AppDispatcher.dispatchAsync(KanbanAPI.deleteTask(cardId, task), {
			request: constants.DELETE_TASK,
			success: constants.DELETE_TASK_SUCCESS,
			failure: constants.DELETE_TASK_ERROR,
		}, {cardId, task, taskIndex});
	},

	toggleTask(cardId: number, task: kanban.Task, taskIndex: number) {
		AppDispatcher.dispatchAsync(KanbanAPI.toggleTask(cardId, task), {
			request: constants.TOGGLE_TASK,
			success: constants.TOGGLE_TASK_SUCCESS,
			failure: constants.TOGGLE_TASK_ERROR,
		}, {cardId, task, taskIndex});
	},
};

export default TaskActionCreators;
