import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class ListMovie extends React.Component {

	constructor () {
		super();
		this.upVote = this.upVote.bind(this);
		this.firebaseRef = firebaseConfig.database.ref('/movies');
		// console.log(this.props, ' this.props')
	}


	upVote (selectedMovie, index) {

		const votesRef = Firebase.database().ref('movies/movie' + index + '/likes');

		console.log(votesRef, ' votesRef')

		if(Firebase.auth().currentUser != null) {

			votesRef.push({
				"id": Firebase.auth().currentUser.uid
			})

			console.log(Firebase.auth().currentUser.uid, ' currentUser');

			const movie = this.props.movies[index];

			console.log(index, ' index', selectedMovie, ' selectedMovie')

			// const upvoteMovie = {
			// 	...movie,
			// 	'likes': selectedMovie.details.likes.push(Firebase.auth().currentUser),
			// }

			// this.props.upvoteMovie(index, upvoteMovie);
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