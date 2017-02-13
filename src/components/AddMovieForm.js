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
			name: this.movieName.value,
			desc: this.movieDesc.value
		}
		console.log('hi', this.movieName.value, this.movieDesc.value)
		this.props.addMovie(movie);
		this.movieForm.reset();
	}

	render() {
		return (
			<form ref={(form) => this.movieForm = form} onSubmit={this.submitMovie}>
				<h2>What movie should we watch this month?</h2>
				<input ref={(input) => this.movieName = input }type="text" className="text-edit" placeholder="movie name...." />
				<input ref={(input) => this.movieDesc = input }type="text" className="text-edit" placeholder="why...?" />
				<button type="submit">Submit</button>
			</form>)
	}
}

export default AddMovieForm;