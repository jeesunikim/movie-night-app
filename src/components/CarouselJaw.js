import React from 'react';

class CarouselJaw extends React.Component {
    constructor(props) {
        super(props);

        this.fetchMovieInfo = this.fetchMovieInfo.bind(this);

        this.state = {
            movieInfo: ""
        }
    }

    componentWillReceiveProps(props) {
        this.fetchMovieInfo(props.movie);
    }

    fetchMovieInfo (imdbID) {
        const url=`http://www.omdbapi.com/?i=${imdbID}&apikey=e39c95bc&plot=full`;

        fetch(url, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({ movieInfo: json });
            console.log(this.state.movieInfo);
        }).catch((err) => {
            console.log(err, ' err');
        });
    }

    render() {
        return (
            <div className="carousel__jaw">
                <div className="carousel__jaw-info">
                    <span className="title">{this.state.movieInfo.Title}</span>
                    <p>{this.state.movieInfo.Plot}</p>
                </div>
                <div className="carousel__jaw-rating">
                    {this.state.movieInfo.Ratings &&
                    	<Ratings 
                    		ratings={this.state.movieInfo.Ratings}
                    	/>
                    }
                    <span><strong>Runtime:</strong> {this.state.movieInfo.Runtime}</span>
                    <span><strong>Genre:</strong> {this.state.movieInfo.Genre}</span>
                    <span><strong>Directed By:</strong> {this.state.movieInfo.Director}</span>
                    <span><strong>Cast:</strong> {this.state.movieInfo.Actors}</span>
                    <span><strong>Awards:</strong> {this.state.movieInfo.Awards}</span>
                </div>
                <div className="carousel__jaw-image">
                    <img src={this.state.movieInfo.Poster} alt={this.state.movieInfo.Title} />
                </div>
            </div>
        )
    }
}

function Ratings (props) {
	const ratings = props.ratings;
	const listRatings = ratings.map((rate, index) =>
		<ListRating key={index} rate={rate} />
	)

	return (
		<ul>{listRatings}</ul>
	)
}

function ListRating (props) {
	const convertToPercentage = props.rate.Source === "Internet Movie Database" ? parseFloat(props.rate.Value).toFixed(2)/10 : parseInt(props.rate.Value)/100;
	const rateSource = props.rate.Source === "Internet Movie Database" ? "IMDB" : props.rate.Source;
	const rateValue = parseFloat(convertToPercentage * 100).toFixed(0) + "%";
	const progressRing = 188.4 * (1 - convertToPercentage);

	return (
		<li>
			<span className="rating"><strong>{rateValue}</strong></span>
			<svg className="progress-bar" width="66" height="66" viewBox="0 0 66 66">
  				<circle className="path" cx="33" cy="33" r="30" fill="none" strokeWidth="6" />
  				<circle className="path--active" cx="33" cy="33" r="30" fill="none" strokeWidth="6" strokeDasharray="188.4" strokeDashoffset={progressRing} />
			</svg>
			<span className="small">{rateSource}</span>
		</li>
	)
}

export default CarouselJaw;