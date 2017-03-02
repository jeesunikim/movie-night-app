import React from 'react';
import AddMovieForm from './AddMovieForm';
import ListMovie from './ListMovie';
import SampleMovies from '../sample-movies';

class App extends React.Component {
	constructor () {
		super();
		this.addMovie = this.addMovie.bind(this);
		this.upVote = this.upVote.bind(this);

		// initial state
		this.state = {
			movies: {}
		}
	}

	componentWillMount () {
		this.setState({
			movies: SampleMovies
		})
	}

	addMovie (movie) {
		const movies = { ...this.state.movies};
		const newMovieNumber = Object.keys(this.state.movies).length+1;

		movies[`movie${newMovieNumber}`] = movie;
	
		this.setState({movies})
		
	}

	upVote (props) {

	}

	render () {

		console.log(Object.keys(this.state.movies), 'this');

		return (
			<div className="movie-night">
				<div className="movie-night__wrapper">
					<h2>What movie should we watch this month?</h2>
					<AddMovieForm addMovie = {this.addMovie}/>
					<ul className="movie-night__list-movies">
						{
							Object.keys(this.state.movies)
							.map(key => <ListMovie key={key} index={key} details={this.state.movies[key]} upVote={this.upVote} />)
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default App;