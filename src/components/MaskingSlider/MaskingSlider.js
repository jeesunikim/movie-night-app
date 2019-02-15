import React from "react";
import "./MaskingSlider.scss";

class MaskingSlider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			votedMovies: []
		};

		// let key = Object.keys(props.movies); // gets the key

		Object.keys(props.movies).map(el => {
			let eachMovie = props.movies[el];
			console.log("el: ", el);
			console.log("eachMovie: ", eachMovie);
		});
		// let eachElement = props.movies[key];

		// console.log("eachElement:", eachElement);

		// console.log("MaskingSlider props.movies: ", props.movies);
		// let movies = Object.keys(props.movies);
		// let movieArr = Object.entries(props.movies);
		// console.log(movies, " movies");
		// console.log(movieArr, " movieArr");
	}

	componentDidMount() {}

	render() {
		return (
			<div className="masking_slider">
				<Slide direction="left" />
				<Slide direction="right" />
			</div>
		);
	}
}

const Slide = props => {
	const { direction } = props;

	return <div className={`masking_slider__${direction}`}>{direction}</div>;
};

export default MaskingSlider;
