import React from 'react';

class ListMovie extends React.Component {

	constructor () {
		super();
		this.upVote = this.upVote.bind(this);
	}

	upVote (selectedMovie) {
		const key = this.props.index;
		const movie = this.props.movies[key];
		const updatedVote = {
			...movie,
			'likes': selectedMovie.details.likes += 1,
		}

		this.props.updateMovie(key, updatedVote);

	}

	render () {
		
		const { details } = this.props;

		return (
			
			<li>
				<img src={details.imageUrl} alt={details.name} />
					{details.name} {details.likes} {details.desc}
				<button onClick={() => this.upVote({details})}></button>
			</li>

		)
	}

};

export default ListMovie;