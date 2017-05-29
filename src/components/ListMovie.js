import React from 'react';
import firebaseConfig from '../../firebase';

class ListMovie extends React.Component {

	constructor () {
		super();
		this.upVote = this.upVote.bind(this);
		this.firebaseRef = firebaseConfig.database.ref('/movies');
	}

	upVote (selectedMovie, index) {

		if(firebaseConfig.auth.currentUser) {

			// this.firebaseRef.child('movie' + index + '/likes').set({
			// 	userID: firebaseConfig.auth.currentUser.uid
			// });

			console.log(selectedMovie, ' selectedMovie', index, ' index');

			console.log(firebaseConfig.auth.currentUser.uid, ' firebaseConfig.auth.currentUser');

			const movie = this.props.movies[index];

			const upvoteMovie = {
				...movie,
				'likes': selectedMovie.details.likes += 1,
			}

			console.log(index, upvoteMovie, ' index, upvoteMovie')

			this.props.upvoteMovie(index, upvoteMovie);
		}
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