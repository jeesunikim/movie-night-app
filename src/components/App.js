import React from "react";
import AddMovieForm from "./AddMovieForm";
import ListMovie from "./ListMovie";
import Carousel from "./Carousel";
import Authentication from "./Authentication";
import firebaseConfig from "../../firebase";
import Firebase from "firebase";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.addMovie = this.addMovie.bind(this);
		this.removeMovie = this.removeMovie.bind(this);
		this.upvoteMovie = this.upvoteMovie.bind(this);
		this.getData = this.getData.bind(this);

		this.firebaseRef = firebaseConfig.database.ref("/movies");

		// initial state
		this.state = {
			isLoaded: false,
			movies: {},
			isAdded: false
		};
	}

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (Object.keys(this.state.movies) > Object.keys(prevState.movies)) {
			this.getData();
		}
	}

	getData() {
		this.firebaseRef.on("value", dataSnapshot => {
			this.setState({
				movies: dataSnapshot.val(),
				isLoaded: true
			});
			console.log(this.state.movies);
			console.log(Object.keys(this.state.movies));
		});
	}

	componentWillUnmount() {
		this.firebaseRef.off();
		this.setState({ isLoaded: false });
	}

	upvoteMovie(selectedMovie, index) {
		const upvotesRef = Firebase.database().ref(
			"movies/" + selectedMovie.movie.key
		);

		if (Firebase.auth().currentUser != null) {
			function toggleVote(firebaseRef, uid) {
				firebaseRef.transaction(movie => {
					if (movie) {
						if (movie.stars && movie.stars[uid]) {
							movie.likes--;
							movie.stars[uid] = null;
						} else {
							movie.likes++;
							if (!movie.stars) {
								movie.stars = {};
							}
							movie.stars[uid] = true;
						}
					}
					return movie;
				});
			}
			toggleVote(upvotesRef, Firebase.auth().currentUser.uid);
		}
	}

	addMovie(movie) {
		const movies = { ...this.state.movies };
		const newMovieRef = this.firebaseRef.push();

		newMovieRef
			.set({
				imageUrl: movie.imageUrl,
				imdbID: movie.imdbID,
				likes: movie.likes,
				name: movie.name,
				createdBy: firebaseConfig.auth.currentUser.uid,
				key: newMovieRef.key
			})
			.then(() => {
				this.setState({ movies: movies });
			});
	}

	removeMovie(key) {
		const movies = { ...this.state.movies };
		movies[key] = null;
		this.setState({ movies });
		this.firebaseRef.child("movie" + key).remove();
	}

	render() {
		return (
			<div className="MovieApp">
				<Authentication />
				<h1>Firstborn Movie Night</h1>
				<AddMovieForm addMovie={this.addMovie} />
				<div className="carousel__container">
					{this.state.isLoaded && (
						<Carousel
							movies={this.state.movies}
							upvoteMovie={this.upvoteMovie}
						/>
					)}
				</div>
				{this.state.isLoaded && (
					<ListMovie
						movies={this.state.movies}
						upvoteMovie={this.upvoteMovie}
						removeMovie={this.removeMovie}
					/>
				)}
			</div>
		);
	}
}

export default App;
