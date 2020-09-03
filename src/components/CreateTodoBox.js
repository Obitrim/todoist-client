import React from "react";
import * as yup from "yup";
import { Formik } from "formik";
import PropTypes from "prop-types";
import "../styles/CreateTodoBox.css";

export default function CreateTodoBox({ createTask }){
	return (
		<Formik
			initialValues={{
				title: "",
				description: ""
			}}
			validationSchema={ yup.object({
				title: yup.string()
					.min(5, "title must be 5 characters or more")
					.required("Missing task title"),
				description: yup.string()
					.required("Missing task description")
			})}
			onSubmit={(values, {resetForm}) => {
				createTask({
					...values,
					completed: false
				});
				resetForm();
			}}
			>
			{formik => (
				<form className="create-todo-box" onSubmit={formik.handleSubmit}>
					<div className="box-row">
						<div className="box-row__col">
							<label htmlFor="title">Title</label>
							<input type="text"
								id="title"
								name="title"
								className="box-row__col__input"
								{...formik.getFieldProps("title")}
								placeholder="Enter task title"
								/>
							{ formik.errors.title && formik.touched.title 
								? <small className="box-row__col__error-message">*{formik.errors.title}</small>
								: null }
						</div>
						<div className="box-row__col">
							<label htmlFor="description">Description</label>
							<input type="text"
								id="description"
								name="description"
								className="box-row__col__input"
								{...formik.getFieldProps("description")} 
								placeholder="Enter task description"
								/>

							{ formik.errors.description && formik.touched.description 
								? <small className="box-row__col__error-message">*{formik.errors.description}</small>
								: null}
						</div>
						<button type="submit" className="box-row__submit">Add Todo</button>
					</div>
				</form>
			)}
		</Formik>
	)
}

CreateTodoBox.propTypes = {
	createTask: PropTypes.func
}