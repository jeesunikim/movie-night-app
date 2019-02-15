import React from "react";
import axios from "axios";

const TMDB_URL_PATH = "https://image.tmdb.org/t/p/original";

class AddMovieForm extends React.Component {
	constructor() {
		super();
		this.submitMovie = this.submitMovie.bind(this);
		this.search = this.search.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.getSelectedMovie = this.getSelectedMovie.bind(this);

		this.state = {
			APImovies: {},
			isSearching: false,
			selectedMovie: null
		};
	}

	submitMovie(event) {
		event.preventDefault();

		if (this.state.selectedMovie) {
			this.props.addMovie(this.state.selectedMovie);
			this.movieForm.reset();
		}
	}

	search(query = "") {
		// @TODO: debounce is needed
		if (query === "") {
			this.setState({ isSearching: false });
		} else {
			// const url=`http://www.omdbapi.com/?s=${query}&apikey=e39c95bc&y=&r=json`;
			const url = `https://api.themoviedb.org/3/search/movie?api_key=c9a7006d14315f99408ebaca9b91622a&language=en-US&query=${query}&page=1&include_adult=false`;
			this.setState({ isSearching: true });

			axios
				.get(url)
				.then(res => {
					const movieResults = res.data.results;
					// this.setState({ persons });
					this.setState({ APImovies: movieResults.slice(0, 5) });
					console.log(movieResults, " movieResults");
					console.log(
						"movieResults.slice(0, 5): ",
						movieResults.slice(0, 5)
					);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	updateSearch(evt) {
		this.search(evt.target.value);
	}

	getSelectedMovie(url) {
		const { movie } = url;
		const movieNameInput = document.getElementById("movieNameInput");

		const newMovie = {
			id: movie.id,
			title: movie.original_title,
			backdropImg: TMDB_URL_PATH + movie.backdrop_path,
			posterImg: TMDB_URL_PATH + movie.poster_path,
			releaseDate: movie.release_date,
			overview: movie.overview
		};

		this.setState({ isSearching: false, selectedMovie: newMovie }, () => {
			console.log("getSelectedMovie this.state: ", this.state);
		});

		movieNameInput.value = newMovie.title;
	}

	render() {
		return (
			<div className="MovieApp__form">
				<form
					ref={input => (this.movieForm = input)}
					onSubmit={e => this.submitMovie(e)}
				>
					<input
						ref={input => (this.name = input)}
						autoComplete="off"
						type="text"
						className="text-edit"
						placeholder="movie name...."
						id="movieNameInput"
						onChange={e => this.updateSearch(e)}
					/>
					<button type="submit">Submit</button>
				</form>
				<ul
					className={`MovieApp__form-dropdown ${
						this.state.isSearching ? "is-searching" : ""
					}`}
				>
					{Object.keys(this.state.APImovies).map(key => (
						<ListFetchMovies
							key={key}
							movie={this.state.APImovies[key]}
							getSelectedMovie={this.getSelectedMovie}
						/>
					))}
				</ul>
			</div>
		);
	}
}

function ListFetchMovies(props) {
	const { movie, getSelectedMovie } = props;

	return (
		<li onClick={evt => getSelectedMovie({ movie })}>
			{movie.title} ({movie.release_date})
		</li>
	);
}

export default AddMovieForm;
