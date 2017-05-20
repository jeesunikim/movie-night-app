import React from 'react';

class ListMovie extends React.Component {

	constructor () {
		super();
		this.upVote = this.upVote.bind(this);
	}

	upVote (selectedMovie, index) {
		const movie = this.props.movies[index];

		const updatedVote = {
			...movie,
			'likes': selectedMovie.details.likes += 1,
		}

		this.props.updateMovie(index, updatedVote);

		console.log(index, updatedVote, ' index', 'updated Vote')
	}

	render () {
		
		const { details, index } = this.props;
		const removeButton = <button onClick={() => this.props.removeMovie(index)}>&times;</button>
		const upVoteButton = <button onClick={() => this.upVote({details}, index)}>+1</button> 

		return (
			
			<li>
				<img src={details.imageUrl} alt={details.name} />
				{details.name} 
				{details.likes} 
				{details.desc}
				{upVoteButton}
				{removeButton}
			</li>

		)
	}

};

// ListMovie.propTypes = {
// 	movies: React.PropTypes.object.isRequired,
// 	details: React.PropTypes.object.isRequired,
// 	index: React.PropTypes.string.isRequired,
// 	removeMovie: React.PropTypes.func.isRequired

// }

export default ListMovie;