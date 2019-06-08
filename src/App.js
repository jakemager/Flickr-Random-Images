import React, { Component } from 'react';
import Nav from './Nav';
import FlickrImage from './FlickrImage';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			seconds: 3,
			running: true
		};

		this.interval = null;
	}

	render() {
		const { running, seconds } = this.state;

		return (
			<div>
				<Nav
					running={running}
					toggleRunning={() => this.setState({ running: !running })}
					seconds={seconds}
					changeSeconds={e => this.setState({ seconds: parseInt(e) })}
				/>
				<FlickrImage
					seconds={seconds}
					running={running}
					flickrApiKey={process.env.REACT_APP_FLICKR_API}
				/>
			</div>
		);
	}
}

export default App;
