import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Nav.css';

class Nav extends Component {
	render() {
		const { running, changeSeconds, toggleRunning, seconds } = this.props;
		return (
			<div className="navWrapper">
				<div>
					<button onClick={toggleRunning}>{running ? 'Pause' : 'Resume'}</button>
				</div>
				<div className="secondsContainer">
					Change picture every
					<input
						className="secondsInput"
						type="text"
						placeholder={!!seconds ? seconds + '' : ''}
						onChange={e => changeSeconds(e.target.value)}
					/>
					seconds
				</div>
			</div>
		);
	}
}

Nav.propTypes = {
	running: PropTypes.bool,
	seconds: PropTypes.number,
	changeSeconds: PropTypes.func,
	toggleRunning: PropTypes.func
};

export default Nav;
