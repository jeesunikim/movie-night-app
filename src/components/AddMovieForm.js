import React from "react";

class AddMovieForm extends React.Component {
	constructor() {
		super();
		this.submitMovie = this.submitMovie.bind(this);
		this.search = this.search.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.updateMovie = this.updateMovie.bind(this);
		this.state = {
			APImovies: {},
			isSearching: false
		};
	}

	submitMovie(event) {
		event.preventDefault();
		const movie = {
			name: this.name.value,
			imdbID: this.imdb.value,
			imageUrl: this.imageUrl.value,
			likes: 0
		};
		this.props.addMovie(movie);
		this.movieForm.reset();
	}

	search(query = "") {
		// @TODO: debounce is needed

		if (query === "") {
			this.setState({ isSearching: false });
		} else {
			// const url=`http://www.omdbapi.com/?s=${query}&apikey=e39c95bc&y=&r=json`;
			const url =
				"https://api.themoviedb.org/3/movie/550?api_key=c9a7006d14315f99408ebaca9b91622a";
			this.setState({ isSearching: true });

			fetch(url, {
				method: "GET"
			})
				.then(res => {
					console.log("res.json: ", res.json());
					return res.json();
				})
				.then(json => {
					this.setState({
						APImovies: json.Search.slice(0, 5)
					});
				})
				.catch(err => {
					console.log(err, "err");
				});
		}
	}

	updateSearch(evt) {
		this.search(evt.target.value);
	}

	updateMovie(url) {
		this.setState({ isSearching: false });

		const movieImgInput = document.getElementById("movieImgUrl");
		const movieNameInput = document.getElementById("movieNameInput");
		const imdbID = document.getElementById("imdbID");

		movieImgInput.value = url.details.Poster;
		movieNameInput.value = url.details.Title;
		imdbID.value = url.details.imdbID;
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
					<input
						ref={input => (this.imdb = input)}
						autoComplete="off"
						type="text"
						className="text-edit hidden"
						placeholder="imdb id"
						id="imdbID"
					/>
					<input
						ref={input => (this.imageUrl = input)}
						autoComplete="off"
						type="text"
						className="text-edit hidden"
						id="movieImgUrl"
						placeholder="movie image"
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
							details={this.state.APImovies[key]}
							updateMovie={this.updateMovie}
						/>
					))}
				</ul>
			</div>
		);
	}
}

function ListFetchMovies(props) {
	const { details, updateMovie } = props;

	return (
		<li onClick={evt => updateMovie({ details })}>
			{details.Title} {details.Year}
		</li>
	);
}

export default AddMovieForm;
