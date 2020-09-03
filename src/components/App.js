import React from 'react';
import axios from "axios";
import "../styles/App.css";
import TaskList from "./TaskList";
import AppLoader from "./AppLoader";
import CreateTodoBox from "./CreateTodoBox";

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			tasks: [],
			loader: {
				show: false,
				text: "Loading..."
			}
		}
	}

	render() {
		return (
			<>
				<AppLoader 
					show={this.state.loader.show} 
					text={this.state.loader.text}
					/>
				<div className="app">
					<h1 className="app__title">Todoist</h1>
					<CreateTodoBox createTask={this.addTaskHandler}/>
					<TaskList 
						title="uncompleted tasks" 
						deleteTodo={this.deleteTodoHandler}
						tasks={this.uncompletedTasks}
						markAsComplete={this.completeTaskHandler} 
						/>
					<TaskList 
						title="completed tasks" 
						tasks={this.completedTasks} 
						deleteTodo={this.deleteTodoHandler}
						clearable={true}
						clearTodos={this.clearTodos}
						/>
				</div>
			</>
		);
	}

	addTaskHandler = task => {
		this.showLoader({ text: "Please wait..."});
		axios.post("http://localhost:3030/api/create", task)
			.then(res => {
				if(this.isSuccessStatus(res.status)){
					this.setState({
						tasks: [
							...this.state.tasks,
							res.data.todo
						] 
					});
				}
			})
			.catch(err => console.error(err.message))
			.finally(() => {
				this.showLoader({ state: false });
			})
	}

	completeTaskHandler = taskIndex => {
		this.showLoader({ state: true, text: "Completing task..." });

		let uncompletedTasks = [...this.uncompletedTasks];
		let task = uncompletedTasks.find((task, index) => index === taskIndex);

		axios.put(`http://localhost:3030/api/complete-todo/${task._id}`)
			.then(res => {
				if(this.isSuccessStatus(res.status)){
					uncompletedTasks[taskIndex] = res.data.todo;
					this.setState({ 
						tasks: [
							...this.completedTasks,
							...uncompletedTasks
						]
					});
				}
			})
			.catch(err => console.error(err))
			.finally(() => {
				this.showLoader({ state: false })
			})
	}

	deleteTodoHandler = task => {
		this.showLoader({ text: "Deleting task. Please wait..." });

		let taskId = task._id;
		axios.delete(`http://localhost:3030/api/remove/${taskId}`)
			.then(res => {
				if(this.isSuccessStatus(res.status)){
					let tasks = [...this.state.tasks];
					let taskIndex = tasks.findIndex(todo => todo._id === res.data.todo._id);
					if(taskIndex > -1){
						tasks.splice(taskIndex, 1);
					}
					this.setState({ tasks });
				}
			})
			.catch(err => console.error(err))
			.finally(() => {
				this.showLoader({ state: false });
			})
	}

	isSuccessStatus =  statusCode => {
		if(!statusCode || statusCode < 100){
			return false;
		} 

		return statusCode >= 200 && statusCode < 300
	}

	clearTodos = () => {
		this.showLoader({ state: true, text: "Clearing tasks..." });
		axios.delete("http://localhost:3030/api/clear/?completed=true")
			.then(res => {
				if(this.isSuccessStatus(res.status)){
					return res.data.todos;
				}

				throw new Error("Couldn't clear tasks");
			})
			.then(uncompletedTasks => {
				this.setState({ tasks: uncompletedTasks });
			})
			.catch(err => console.error(err.message))
			.finally(() => {
				this.showLoader({ state: false });
			})
	}

	showLoader = ({state = true, text="Loading..."}) => {
		this.setState({
			loader: {
				show: state,
				text
			} 
		});
	}
	
	get completedTasks(){
		return this.state.tasks.filter(task => task.completed)
	}

	get uncompletedTasks(){
		return this.state.tasks.filter(task => !task.completed)
	}

	componentDidMount(){
		this.showLoader({ state: true })
		axios.get("http://localhost:3030/api/")
			.then(res => {
				let { data, status } = res;

				if(status >= 200 || status < 300){
					this.setState({
						tasks: data.todos || []
					});
				}
			})
			.catch(err => console.error(err))
			.finally(() => {
				this.showLoader({ state: false })
			})
	}
}
