import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class ListMovie extends React.Component {

	constructor () {
		super();
		this.upVote = this.upVote.bind(this);
		this.firebaseRef = firebaseConfig.database.ref('/movies');
	}

	upVote (selectedMovie, index) {
		const upvotesRef = Firebase.database().ref('movies/' + selectedMovie.details.key);

		if(Firebase.auth().currentUser != null) {
			function toggleVote(firebaseRef, uid) {
				firebaseRef.transaction((post) => {
					if (post) {
						if(post.stars && post.stars[uid]) {
							post.likes--;
							post.stars[uid] = null;
						}else{
							post.likes++;
							if (!post.stars) {
					          post.stars = {};
					        }
					        post.stars[uid] = true;
						}
					}
					return post;
				});
			}

			toggleVote(upvotesRef, Firebase.auth().currentUser.uid);

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

export default ListMovie;