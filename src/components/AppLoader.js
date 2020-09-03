import React from 'react';
import "../styles/AppLoader.css";
import PropTypes from "prop-types";

export default class AppLoader extends React.Component {
	render() {
		const loader = this.props.show ? (
			<div className="appLoader">
				<div className="appLoader__spinner"></div>
				<span>{this.props.text}</span>
			</div>
		): null;

		return loader
	}
}

AppLoader.propTypes = {
	show: PropTypes.bool,
	text: PropTypes.string,
}

AppLoader.defaultProps = {
	text: "Loading..."
}