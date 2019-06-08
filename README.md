## Jakes Flickr Component

Live: [http://jakemager.com/flickr/](http://jakemager.com/flickr/)

This app contains a flickr component that will generate a random image every x seconds.
The flickr component is very simple, it takes props seconds (interger) and running (boolean). The seconds prop will determine how often the image will retrieve a new random image from Flickr interesting images and the running allows the component to stop or continue retrieivng new images.

Without any props the component will generate a new picture every 3 seconds and run until there is no images left from the Flickr API.

Whenever the seconds or running value changes, the user will be notified.

## Running

### `REACT_APP_FLICKR_API='your_flickr_api_key' npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You can aquire a Flickr api key at [https://www.flickr.com/services/api/](https://www.flickr.com/services/api/)
