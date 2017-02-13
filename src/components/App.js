import React from 'react';
import AddMovieForm from './AddMovieForm';

class App extends React.Component {
	constructor () {
		super();
		this.addMovie = this.addMovie.bind(this);
		this.state = {
			movies: {}
		}
	}

	addMovie (movie) {
		const movies = { ...this.state.movies};
		console.log(movies.length)
	}
	render () {
		return (
			<div className="container">
				<AddMovieForm addMovie={this.addMovie}/>
			</div>
		)
	}
}

export default App;