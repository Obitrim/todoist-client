import React from 'react';
import PropTypes from "prop-types";
import "../styles/TaskListItem.css";

export default class TaskListItem extends React.Component {
	render() {
		const completeBtn = !this.props.task.completed 
			? (
				<button 
					className="action-btns__complete-btn" 
					onClick={this.completeTaskHandler}
					> Complete </button>
			)
			: null;

		return (
			<li className="task-list-item">
				<div className="task-info">
					<p className="task-info__title">{this.props.task.title}</p>
					<p className="task-info__description">{this.props.task.description}</p>
				</div>
				<div className="action-btns">
					{completeBtn}
					<button className="action-btns__delete-btn" onClick={this.deleteTodoHandler}>Delete</button>
				</div>
			</li>
		);
	}

	completeTaskHandler = () => {
		this.props.markAsComplete(this.props.taskIndex);
	}

	deleteTodoHandler = () => {
		this.props.deleteTodo(this.props.task);
	}
}

TaskListItem.propTypes = {
	task: PropTypes.object,
	taskIndex: PropTypes.number,
	markAsComplete: PropTypes.func,
}

TaskListItem.defaultProps = {
	task: {
		title: "Task title",
		description: "Lorem ipsum dolor sit amet.",
		completed: false
	},
	taskIndex: 0,
	markAsComplete: () => console.log("TaskListItem: Default markAsComplete")
}
