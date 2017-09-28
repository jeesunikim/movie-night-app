import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class ListMovie extends React.Component {

	constructor (props) {
		super(props);

		this.movies = Object.keys(this.props.movies);
		// this.getAvatar = this.getAvatar.bind(this);
		// this.firebaseRef = firebaseConfig.database.ref(`users/${firebaseConfig.auth.currentUser.uid}`);

		// console.log(firebaseConfig.auth.currentUser.uid, ' firebaseConfig.auth.currentUser.uid');

		// this.getAvatar();
	}

	componentDidMount() {

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
								movie={this.props.movies[key]} 
								removeMovie={this.props.removeMovie} 
								upvoteMovie={this.props.upvoteMovie} 
							/>
						)
					}
				</ul>
			</div>
		)
	}

};

function getAvatar (uid) {
	
	let avatarArray = [];

	let result;

	// try{
		// return <span>meow</span>
		// if(uid.length > 1) {
		// 	uid.forEach(eachUID => {
		// 		console.log(eachUID, ' eachUID')
		// 		firebaseConfig.database.ref("/users/" + eachUID).once("value").then((snapshot) => {	
		// 			avatarArray.push(snapshot.val().photoURL);
		// 			console.log(avatarArray, ' avatarArray in length > 1')
		// 		})
		// 	})
		// }else{
		// 	console.log(uid[0], ' uid')
			firebaseConfig.database.ref("/users/" + uid[0]).once("value").then((snapshot) => {
				if(snapshot.val() !== null) {
					
					result = snapshot.val().photoURL;
					console.log(result, ' result')

					return "result";
				}	
			})
		// }
		return uid[0];


}

function MovieAppList (props) {

	const { movie, index } = props;

	const UpvoteButton = <button className="button__upvote" onClick={() => props.upvoteMovie({movie}, index)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="100 -30 190 150">
			<path className="heart-icon" d="M251.5,45.5c0-17.8-11.1-34.6-28.9-34.6c-9,0-16.6,6.3-22.4,12.7c-5.7-6.3-13-12.7-21.8-12.7 c-17.8,0-29.9,16.8-29.9,34.6c0,24.7,37.2,51.1,52.4,51.1C217.5,96.6,251.5,67.7,251.5,45.5z"></path></svg></button>;
	const RemoveButton = <button className="button__delete" onClick={() => props.removeMovie(index)}>&times;</button>;
	const likedUsers = movie.stars ? <span className="MovieApp__result-list-avatars">{ getAvatar(Object.keys(movie.stars)) }</span> : <span className="MovieApp__result-list-avatars">empty</span>;

	return (
		<li>
			<span className="MovieApp__result-list-title">{ movie.name }</span>
			<span className="MovieApp__result-list-likes">{ movie.likes }</span>
			{ likedUsers }
			<span className="MovieApp__result-list-upvote">{ UpvoteButton }</span>
			<span className="blue hidden">{ RemoveButton }</span>
		</li>
	)
}

export default ListMovie;