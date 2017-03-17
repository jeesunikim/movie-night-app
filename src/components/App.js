import React from 'react';
import AddMovieForm from './AddMovieForm';
import ListMovie from './ListMovie';
import sampleMovies from '../sample-movies';
import Authentication from './Authentication';
import base from '../base';


class App extends React.Component {
	constructor () {
		super();
		this.addMovie = this.addMovie.bind(this);
		this.updateMovie = this.updateMovie.bind(this);
		this.removeMovie = this.removeMovie.bind(this);

		// initial state
		this.state = {
			movies: {}
		};
	}

	componentWillMount () {
		this.ref = base.syncState(`/movies`,
			{ 	
				context: this,
				state: 'movies'
			});
			
		this.setState({
			movies: sampleMovies
		});
	}

	componentWillUnmount () {
		base.removeBinding(this.ref);
	}

	addMovie (movie) {
		const movies = {...this.state.movies};
		const newMovieNumber = Object.keys(this.state.movies).length+1;

		movies[`movie${newMovieNumber}`] = movie;
	
		this.setState({movies});
		
	}

	updateMovie (key, updatedVote) {
		const movies = {...this.state.movies};
		movies[key] = updatedVote;
		this.setState({movies});

		console.log(movies, 'movies')
	}

	removeMovie (key) {
		const movies = {...this.state.movies}
		movies[key] = null;
		this.setState({movies});
	}

	render () {

		return (
			<div className="movie-night">
				<Authentication />
				<div className="movie-night__wrapper">
					<h2>What movie should we watch this month?</h2>
					<AddMovieForm addMovie={this.addMovie} />
					<ul className="movie-night__list-movies">
						{
							Object.keys(this.state.movies)
							.map(key => 
								<ListMovie 
									key={key} 
									index={key}
									movies={this.state.movies} 
									details={this.state.movies[key]} 
									updateMovie={this.updateMovie} 
									removeMovie={this.removeMovie}
								/>
							)
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default App;