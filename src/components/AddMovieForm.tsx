import React, { Component, createRef } from "react";
import axios from "axios";

if (!process.env.API_TMDB_KEY) {
    throw new Error("no API keys");
}

const TMDB_URL_PATH = "https://image.tmdb.org/t/p/original";
const API_TMDB_KEY = process.env.API_TMDB_KEY;

interface Props {
    addMovie: (data: {}) => void;
}

interface State {
    APImovies: {
        [key: string]: "";
    }; // was {}
    isSearching: Boolean;
    selectedMovie: {
        id: string;
        title: string;
        backdropImg: string;
        posterImg: string;
        releaseDate: string;
        overview: string;
    };
}

class AddMovieForm extends Component<Props, State> {
    private movieFormRef: React.RefObject<HTMLFormElement>;
    private movieInputNameRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.submitMovie = this.submitMovie.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
        this.getSelectedMovie = this.getSelectedMovie.bind(this);

        this.state = {
            APImovies: {},
            isSearching: false,
            selectedMovie: {
                id: "",
                title: "",
                backdropImg: "",
                posterImg: "",
                releaseDate: "",
                overview: ""
            }
        };
        this.movieFormRef = React.createRef();
        this.movieInputNameRef = React.createRef();
    }

    //  = createRef<HTMLFormElement | null>();

    public submitMovie(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const node = this.movieFormRef.current;

        if (this.state.selectedMovie && node) {
            this.props.addMovie(this.state.selectedMovie);
            node.reset();
        }
    }

    public handleSearch(query = "") {
        // @TODO: debounce is needed
        if (query === "") {
            this.setState({ isSearching: false });
        } else {
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TMDB_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
            this.setState({ isSearching: true });

            axios
                .get(url)
                .then(res => {
                    if (!res.data) {
                        return;
                    }
                    const movieResults = res.data.results;
                    // (data: MovieResponse)
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

    public handleUpdateSearch(event: React.ChangeEvent<HTMLInputElement>) {
        if (!(event.target instanceof HTMLInputElement)) {
            return;
        }

        if (event.target.value) {
            this.handleSearch(event.target.value);
        }
    }

    public getSelectedMovie(url: any) {
        const { movie } = url;
        const movieNameInput = document.getElementById("movieNameInput");

        // const newMovie = {
        //     id: movie.id,
        //     title: movie.original_title,
        //     backdropImg: TMDB_URL_PATH + movie.backdrop_path,
        //     posterImg: TMDB_URL_PATH + movie.poster_path,
        //     releaseDate: movie.release_date,
        //     overview: movie.overview
        // };

        this.setState(
            {
                isSearching: false,
                selectedMovie: {
                    id: movie.id,
                    title: movie.original_title,
                    backdropImg: TMDB_URL_PATH + movie.backdrop_path,
                    posterImg: TMDB_URL_PATH + movie.poster_path,
                    releaseDate: movie.release_date,
                    overview: movie.overview
                }
            },
            () => {
                console.log("getSelectedMovie this.state: ", this.state);
            }
        );

        const node = this.movieInputNameRef.current;
        if (node) {
            node.value = this.state.selectedMovie.title;
        }
    }

    public render() {
        const { APImovies, isSearching } = this.state;
        return (
            <div className="MovieApp__form">
                <form
                    ref={this.movieFormRef}
                    onSubmit={e => this.submitMovie(e)}
                >
                    <input
                        ref={this.movieInputNameRef}
                        autoComplete="off"
                        type="text"
                        className="text-edit"
                        placeholder="movie name...."
                        onChange={e => this.handleUpdateSearch(e)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <ul
                    className={`MovieApp__form-dropdown ${
                        isSearching ? "is-searching" : ""
                    }`}
                >
                    {Object.keys(APImovies).map(key => (
                        <ListFetchMovies
                            key={key}
                            movie={APImovies[key]}
                            getSelectedMovie={this.getSelectedMovie}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

function ListFetchMovies(props: any) {
    const { movie, getSelectedMovie } = props;

    return (
        <li onClick={evt => getSelectedMovie({ movie })}>
            {movie.title} ({movie.release_date})
        </li>
    );
}

export default AddMovieForm;
