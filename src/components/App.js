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

		console.log(movie, ' movie')
	
		newMovieRef.set({
			imageUrl: movie.imageUrl,
			imdbID: movie.imdbID,
			likes: movie.likes,
			name: movie.name,
			createdBy: firebaseConfig.auth.currentUser.uid,
			key: newMovieRef.key
		});
	}

	removeMovie (key) {
		const movies = {...this.state.movies}
		movies[key] = null;
		this.setState({movies});
		this.firebaseRef.child('movie' + key).remove();
	}
	
	render () {
		return (
			<div className="MovieApp">
				<Authentication />
				<h1>Firstborn Movie Night</h1>
				<AddMovieForm addMovie={this.addMovie} />
				{this.state.isLoaded && 
					<Carousel movies={this.state.movies} />
				}
				{this.state.isLoaded && 
					<ListMovie
						movies={this.state.movies} 
						removeMovie={this.removeMovie}
					/>
				}
			</div>
		)
	}
}

export default App;