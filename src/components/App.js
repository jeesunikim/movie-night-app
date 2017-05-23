import React from 'react';
import AddMovieForm from './AddMovieForm';
import ListMovie from './ListMovie';
import sampleMovies from '../sample-movies';
import Authentication from './Authentication';
import firebaseConfig from '../../firebase';
import * as firebase from 'firebase';


class App extends React.Component {
	constructor () {
		super();
		this.addMovie = this.addMovie.bind(this);
		this.updateMovie = this.updateMovie.bind(this);
		this.removeMovie = this.removeMovie.bind(this);

		this.firebaseRef = firebaseConfig.database.ref('/movies');
		this.movies = [];

		// initial state
		this.state = {
			movies: {}
		};

	}

	componentDidMount () {

		this.firebaseRef.on("child_added", (dataSnapshot) => {
		    this.movies.push(dataSnapshot.val());
		    this.setState({
		      movies: this.movies
		    });



		 }).bind(this);

	}

	componentWillUnmount () {
		this.firebaseRef.off();
	}

	addMovie (movie) {
		const movies = {...this.state.movies};
		const newMovieNumber = Object.keys(this.state.movies).length;

		movies[`movie${newMovieNumber}`] = movie;
	
		this.setState({movies});
	
		this.firebaseRef.child('movie' + newMovieNumber).set({
			desc: movie.desc,
			imageUrl: movie.imageUrl,
			likes: movie.likes,
			name: movie.name
		});
	}

	updateMovie (key, updatedVote) {
		const movies = {...this.state.movies};
		movies[key] = updatedVote;
		this.setState({movies});

		console.log('updateMovie ', movies[key], updatedVote)
	}

	removeMovie (key) {
		const movies = {...this.state.movies}

		console.log(movies, ' movies')

		console.log(key, ' key');

		movies[key] = null;

		this.setState({movies});

		this.firebaseRef.child('movie' + key).remove();


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