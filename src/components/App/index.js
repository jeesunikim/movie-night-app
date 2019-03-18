import React, { Component } from "react";
import AddMovieForm from "../AddMovieForm";
import MaskingSlide from "../MaskingSlide";
import Authentication from "../Authentication";
import { auth, database } from "../../../firebase";

// import MovieList from "./MovieList";
// import Carousel from "./Carousel";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.addMovie = this.addMovie.bind(this);
        this.removeMovie = this.removeMovie.bind(this);
        this.firebaseRef = database.ref("/movies");

        // initial state
        this.state = {
            isLoaded: false,
            movies: {},
            isAdded: false
        };
    }

    componentDidMount() {
        this.firebaseRef.on("value", dataSnapshot => {
            this.setState({
                movies: Object.values(dataSnapshot.val()),
                isLoaded: true
            });
        });
    }

    componentWillUnmount() {
        this.firebaseRef.off();
        this.setState({ isLoaded: false });
    }

    upvoteMovie = selectedMovie => {
        const upvotesRef = database.ref("movies/" + selectedMovie.movie.key);

        if (auth.currentUser != null) {
            const toggleVote = (firebaseRef, uid) => {
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
            };
            toggleVote(upvotesRef, auth.currentUser.uid);
        }
    };

    addMovie(movie) {
        const { movies } = this.state;
        const newMovieRef = this.firebaseRef.push();

        newMovieRef
            .set({
                id: movie.id,
                title: movie.title,
                backdropImg: movie.backdropImg,
                posterImg: movie.posterImg,
                releaseDate: movie.releaseDate,
                overview: movie.overview,
                createdBy: auth.currentUser.uid,
                key: newMovieRef.key
            })
            .then(() => {
                this.setState({ movies });
            });
    }

    removeMovie(key) {
        const { movies } = this.state;
        movies[key] = null;
        this.setState({ movies });
        this.firebaseRef.child("movie" + key).remove();
    }

    filterMovies() {
        const { movies } = this.state;
        const moviesArray = Object.values(movies);
        // Filter the movies to return ones that a user has not voted

        return moviesArray;
    }

    render() {
        const { isLoaded, movies } = this.state;
        const filteredMovies = this.filterMovies();
        const moviesHalfList = Math.floor(filteredMovies.length / 2);
        const moviesList = {
            leftSlide: filteredMovies.slice(0, moviesHalfList),
            rightSlide: filteredMovies.slice(
                moviesHalfList,
                filteredMovies.length
            )
        };
        console.log("filteredMovies: ", filteredMovies);
        return (
            <div className="MovieApp">
                <Authentication />
                <h1>Firstborn Movie Night</h1>
                <AddMovieForm addMovie={this.addMovie} />
                <h1>The total length of movies: {filteredMovies.length} </h1>
                {isLoaded && (
                    <Slider>
                        <MaskingSlide
                            movies={moviesList.leftSlide}
                            upvoteMovie={this.upvoteMovie}
                            directionTo="bottom"
                        />
                        <MaskingSlide
                            movies={moviesList.rightSlide}
                            upvoteMovie={this.upvoteMovie}
                            directionTo="top"
                        />
                    </Slider>
                )}
                {/* <div className="carousel__container">
          {isLoaded && (
            <Carousel movies={movies} upvoteMovie={this.upvoteMovie} />
          )}
        </div> */}
                {/* {isLoaded && (
                    <MovieList
                        movies={movies}
                        upvoteMovie={this.upvoteMovie}
                        removeMovie={this.removeMovie}
                    />
                )} */}
            </div>
        );
    }
}

const Slider = ({ children }) => {
    return <div className="MovieApp_Slider">{children}</div>;
};
