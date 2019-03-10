import React, { Component } from "react";
import AddMovieForm from "./AddMovieForm";
import ListMovie from "./ListMovie";
import Carousel from "./Carousel";
import MaskingSlide from "./MaskingSlide";
import Authentication from "./Authentication";
import firebaseConfig from "../../firebase";
import Firebase from "firebase";

const ThemeContext = React.createContext("light");

class App extends Component {
  constructor(props) {
    super(props);
    this.addMovie = this.addMovie.bind(this);
    this.removeMovie = this.removeMovie.bind(this);
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
    // if (this.state.isLoaded) {
    //   console.log("this.state.isLoaded");
    // }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { movies } = this.state;
  //   console.log(
  //     "componentDidUpdate Object.keys(movies): ",
  //     Object.keys(movies)
  //   );

  //   console.log(
  //     "componentDidUpdate Object.keys(prevState.movies): ",
  //     Object.keys(prevState.movies)
  //   );
  //   if (Object.keys(movies) > Object.keys(prevState.movies)) {
  //     this.getData();
  //   }
  // }

  getData() {
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

  upvoteMovie = (selectedMovie, index) => {
    const upvotesRef = Firebase.database().ref(
      "movies/" + selectedMovie.movie.key
    );

    if (Firebase.auth().currentUser != null) {
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
      toggleVote(upvotesRef, Firebase.auth().currentUser.uid);
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
        // createdBy: firebaseConfig.auth.currentUser.uid,
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
      rightSlide: filteredMovies.slice(moviesHalfList, filteredMovies.length)
    };
    return (
      <div className="MovieApp">
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
        <Authentication />
        <h1>Firstborn Movie Night</h1>
        <AddMovieForm addMovie={this.addMovie} />
        {/* <div className="carousel__container">
          {isLoaded && (
            <Carousel movies={movies} upvoteMovie={this.upvoteMovie} />
          )}
        </div> */}
        {isLoaded && (
          <ListMovie
            movies={movies}
            upvoteMovie={this.upvoteMovie}
            removeMovie={this.removeMovie}
          />
        )}
      </div>
    );
  }
}

const Slider = ({ children }) => {
  return <div className="MovieApp_Slider">{children}</div>;
};

export default App;
