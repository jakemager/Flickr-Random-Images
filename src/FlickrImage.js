import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';

import './FlickrImage.css';

class FlickrImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			photos: {},
			currentPhoto: {},
			currentPage: 1,
			finished: false,
			notification: null
		};

		this.interval = null;
		this.mounted = true;
	}

	componentDidMount() {
		if (!!this.props.flickrApiKey) this.getAllImages();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.running !== this.props.running && this.mounted) {
			this.toggleRunning();
		}

		if (prevProps.seconds !== this.props.seconds && this.mounted) {
			this.changeSeconds();
		}
	}

	componentWillUnmount() {
		this.mounted = false;
		clearInterval(this.interval);
	}

	getAllImages = () => {
		if (!!this.interval) clearInterval(this.interval);

		Axios.get(
			`https://api.flickr.com/services/rest/?format=json&method=flickr.interestingness.getList&api_key=${
				this.props.flickrApiKey
			}&per_page=25&page=${this.state.currentPage}`
		)
			.then(res => {
				let response = res.data.replace('jsonFlickrApi(', '');
				response = response.substring(0, response.length - 1);
				this.setState(
					{ photos: JSON.parse(response).photos.photo, currentPage: this.state.currentPage + 1 },
					() => {
						this.getImage();
						this.interval = setInterval(this.getImage, this.props.seconds * 1000);
					}
				);
			})
			.catch(err => {
				console.error(err);
				this.setState({ finished: true });
			});
	};

	getImage = () => {
		const { photos } = this.state;

		if (!this.mounted) return;

		if (photos.length === 0) {
			this.getAllImages();
			return;
		}

		const photo = photos[Math.floor(Math.random() * photos.length)];
		const url =
			'https://farm' +
			photo.farm +
			'.static.flickr.com/' +
			photo.server +
			'/' +
			photo.id +
			'_' +
			photo.secret +
			'.jpg';

		this.setState({
			currentPhoto: { src: url, title: photo.title },
			photos: photos.filter(obj => obj.id !== photo.id)
		});
	};

	toggleRunning = () => {
		const { running, seconds } = this.props;

		if (running) {
			this.interval = setInterval(this.getImage, seconds * 1000);
		} else {
			clearInterval(this.interval);
		}

		this.setState({ notification: running ? 'Resuming' : 'Paused' }, () =>
			setTimeout(() => this.setState({ notification: null }), 1500)
		);
	};

	changeSeconds = () => {
		const { seconds } = this.props;

		if (!seconds) return;

		clearInterval(this.interval);
		this.interval = setInterval(this.getImage, seconds * 1000);
		this.setState(
			{
				notification: `Interval changed to ${seconds} second${seconds > 1 ? 's' : ''}`
			},
			() => setTimeout(() => this.setState({ notification: null }), 1500)
		);
	};

	render() {
		const { currentPhoto, finished, notification } = this.state;

		if (!this.props.flickrApiKey)
			return (
				<div>
					This app needs the Flickr api to run. Start the app with
					REACT_APP_FLICKR_API='your_api_key_here'` <br />
					You can get the api key at{' '}
					<a href="https://www.flickr.com/services/api/">https://www.flickr.com/services/api/</a>
				</div>
			);
		else if (finished) return <div>That is the end of all interesting photos</div>;
		return (
			<div>
				<div id="alert" className={!!notification ? 'visible' : ''}>
					{notification}
				</div>
				{!!currentPhoto.src ? (
					<a href={currentPhoto.src} target="_blank" rel="noopener noreferrer">
						<img
							className="flickrImage"
							src={currentPhoto.src}
							title={currentPhoto.title}
							alt={currentPhoto.title}
						/>
					</a>
				) : (
					<div>Loading...</div>
				)}
			</div>
		);
	}
}

FlickrImage.defaultProps = {
	seconds: 3,
	running: true,
	flickrApiKey: null
};

FlickrImage.propTypes = {
	running: PropTypes.bool,
	seconds: PropTypes.number,
	flickrApiKey: PropTypes.string.isRequired
};

export default FlickrImage;
