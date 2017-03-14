import React from 'react';
import ListFetchMovies from './ListFetchMovies';

class AddMovieForm extends React.Component {
	constructor() {
		super();
		this.submitMovie = this.submitMovie.bind(this);
		this.search = this.search.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.updateMovie = this.updateMovie.bind(this);
		this.state = {
			APImovies: {}
		}
	}

	componentWillUpdate () {
		this.search();
	}

	submitMovie (event) {
		event.preventDefault()
		const movie = {
			name: this.name.value,
			desc: this.desc.value,
			imageUrl: this.imageUrl.value,
			likes: 0
		}
		this.props.addMovie(movie);
		this.movieForm.reset();
	}

	search (query='') {

		// debounce is needed

	    let url=`http://www.omdbapi.com/?s=${query}&y=&r=json&plot=short`;

	    fetch(url, {

	    	method: 'GET'

	    }).then((res) => {

    		return res.json();

	    }).then((json) => {

    		this.setState({
    			APImovies: json.Search.slice(0,5)
    		})
	    			    	
	    }).catch((err) => {

	    	console.log(err, 'err');

	    });

	}
  
	updateSearch(evt) {
		
		this.search(evt.target.value);

	}

	updateMovie(url) {

		const movieImgInput = document.getElementById('movieImgUrl');
		const movieNameInput = document.getElementById('movieNameInput');

		movieImgInput.value = url.details.Poster;
		movieNameInput.value = url.details.Title;

	}

	render() {
		return (
			<div>
				<form className="movie-night__addmovie" ref={(input) => this.movieForm=input} onSubmit={(e) => this.submitMovie(e)}>
					<input ref={(input) => this.name = input } autoComplete="off" type="text" className="text-edit" placeholder="movie name...." id="movieNameInput" onChange={ (e) => this.updateSearch(e) } />
					<input ref={(input) => this.desc = input } autoComplete="off" type="text" className="text-edit" placeholder="why...?" />
					<input ref={(input) => this.imageUrl = input } autoComplete="off" type="text" className="text-edit" id="movieImgUrl" placeholder="movie image" />
					<button type="submit" >Submit</button>
				</form>
				<ul className="movie-night__dropdown">
					{
						Object.keys(this.state.APImovies)
						.map(key => <ListFetchMovies key={key} details={this.state.APImovies[key]} updateMovie={this.updateMovie} />)
					}
				</ul>		
			</div>
		)
	}
}

AddMovieForm.propTypes = {
	addMovie: React.PropTypes.func.isRequired
}

export default AddMovieForm;