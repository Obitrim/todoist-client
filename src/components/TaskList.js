import React from 'react';
import "../styles/TaskList.css";
import PropTypes from "prop-types";
import TaskListItem from "./TaskListItem";

export default class TaskList extends React.Component {
	render() {
		const listTitle = !!this.props.title.trim() 
			? <span className="task-list__title">{this.props.title}</span> 
			: null;
		const taskListTemplate = this.props.tasks.map((task, index) => {
			return (
				<TaskListItem 
					task={task} 
					key={index} 
					taskIndex={index}
					markAsComplete={this.props.markAsComplete}
					deleteTodo={this.props.deleteTodo}
					/>
			)
		});
		const clearBtn = this.props.clearable 
			? (<li className="clearControlWrapper">
					<button 
						className="clearBtn" 
						onClick={this.props.clearTodos} 
						disabled={this.props.tasks.length === 0}
						> Clear
					</button>
				</li>)
			: null;

		return (
			<ul className="task-list">
				{listTitle}
				{taskListTemplate}
				{clearBtn}
			</ul>
		);
	}
}

TaskList.propTypes = {
	tasks: PropTypes.array,
	title: PropTypes.string,
	clearable: PropTypes.bool,
	deleteTodo: PropTypes.func,
	clearTodos: PropTypes.func,
	markAsComplete: PropTypes.func,
}

TaskList.defaultProps = {
	tasks: [
		{
			title: "Task 1",
			description: "List Item",
			completed: false,
		},
		{
			title: "Task 2",
			description: "List Item 2",
			completed: true,
		}
	],

	title: "",
	clearable: false
}
