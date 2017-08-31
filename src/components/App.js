import React from 'react';
import AddMovieForm from './AddMovieForm';
import ListMovie from './ListMovie';
import Carousel from './Carousel';
import Authentication from './Authentication';
import firebaseConfig from '../../firebase';
import * as firebase from 'firebase';


class App extends React.Component {
	constructor () {
		super();
		this.addMovie = this.addMovie.bind(this);
		this.upvoteMovie = this.upvoteMovie.bind(this);
		this.removeMovie = this.removeMovie.bind(this);

		// initial state
		this.state = {
			isLoaded: false,
			movies: {}
		};
	}

	componentWillMount () {
		this.firebaseRef = firebaseConfig.database.ref('/movies');
		this.firebaseRef.on("value", (dataSnapshot) => {
		    this.setState({
		      movies: dataSnapshot.val(),
		      isLoaded: true
		    });
		}).bind(this);
	}

	componentWillUnmount () {
		this.firebaseRef.off();
	}

	addMovie (movie) {
		const movies = {...this.state.movies};
		const newMovieRef = this.firebaseRef.push();
	
		this.setState({movies});
	
		newMovieRef.set({
			desc: movie.desc,
			imageUrl: movie.imageUrl,
			likes: movie.likes,
			name: movie.name,
			createdBy: firebaseConfig.auth.currentUser.uid,
			key: newMovieRef.key
		});
	}

	upvoteMovie (key, upvotedMovie) {
		const movies = {...this.state.movies};
		movies[key] = upvotedMovie;
		this.setState({movies});
	}

	removeMovie (key) {
		const movies = {...this.state.movies}
		movies[key] = null;
		this.setState({movies});
		this.firebaseRef.child('movie' + key).remove();
	}
	
	render () {
		return (
			<div className="movie-night">
				<Authentication />
				{this.state.isLoaded && 
					<Carousel 
						movies={this.state.movies} 
					/>
				}
				<div className="movie-night__wrapper">
					<h2>What movie should we watch this month?</h2>
					<AddMovieForm addMovie={this.addMovie} />
					<ul className="movie-night__list">
						{
							Object.keys(this.state.movies)
							.map(key => 
								<ListMovie 
									key={key} 
									index={key}
									movies={this.state.movies} 
									details={this.state.movies[key]} 
									upvoteMovie={this.upvoteMovie} 
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