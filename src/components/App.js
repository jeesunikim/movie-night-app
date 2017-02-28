import React from 'react';
import AddMovieForm from './AddMovieForm';
import ListMovie from './ListMovie';
import SampleMovies from '../sample-movies';

class App extends React.Component {
	constructor () {
		super();
		this.addMovie = this.addMovie.bind(this);
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
		
	}

	render () {
		console.log(this.state.movies, 'likes')
		return (
			<div className="movie-night">
				<div className="movie-night__wrapper">
					<AddMovieForm addMovie = {this.addMovie}/>
					<ul className="movie-night__list-movies">
						{
							Object.keys(this.state.movies)
							.map(key => <ListMovie key={key} index={key} details={this.state.movies[key]} upVote={this.uptVote} />)
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default App;