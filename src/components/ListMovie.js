import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class ListMovie extends React.Component {

	constructor (props) {
		super(props);

		this.movies = Object.keys(this.props.movies);

		this.upVote = this.upVote.bind(this);
		this.firebaseRef = firebaseConfig.database.ref('/movies');

		console.log(this.movies, ' this.movies')
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
		return (
			<div className="MovieApp__result">
				<span className="small">Results for</span>
				<h2>The movie of the month</h2>
				<ul className="MovieApp__result-list">
					{
						this.movies.map(key => 
							<MovieAppList 
								key={key} 
								index={key} 
								movies={this.props.movies} 
								details={this.props.movies[key]} 
								removeMovie={this.props.removeMovie} 
								upVote={this.upVote} 
							/>
						)
					}
				</ul>
			</div>
		)
	}

};

function MovieAppList (props) {
	const { details, index } = props;
	const UpvoteButton = <button onClick={() => props.upVote({details}, index)}>+1</button>;
	const RemoveButton = <button onClick={() => props.removeMovie(index)}>&times;</button>;

	return (
		<li>
			<span className="yellow">{ details.name }</span>
			<span className="MovieApp__result-list-likes">{ details.likes }</span>
			<span className="green"></span>
			<span className="red">{ UpvoteButton }</span>
			<span className="button__delete blue">{ RemoveButton }</span>
		</li>
	)
}

export default ListMovie;