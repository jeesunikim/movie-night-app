import React from 'react';
import { render } from 'react-dom';

class AddMovieForm extends React.Component {
	constructor() {
		super();
		this.submitMovie = this.submitMovie.bind(this);
	}

	submitMovie (event) {
		event.preventDefault()
		const movie = {
			name: this.name.value,
			desc: this.desc.value,
			imageUrl: this.imageUrl.value
		}
		console.log(movie, 'movie')
		// this.props.addMovie(movie);
		// this.movieForm.reset();
	}

	render() {
		return (
			<form className="movie-night__addmovie" onSubmit={(e) => this.submitMovie(e)}>
				<input ref={(input) => this.name = input } type="text" className="text-edit" placeholder="movie name...." />
				<input ref={(input) => this.desc = input } type="text" className="text-edit" placeholder="why...?" />
				<input ref={(input) => this.imageUrl = input } type="text" className="text-edit" placeholder="movie image" />
				<button type="submit">Submit</button>
			</form>)
	}
}

export default AddMovieForm;