import React from 'react';
import Firebase from 'firebase';
import firebaseConfig from '../../firebase';

class ListMovie extends React.Component {

	constructor (props) {
		super(props);

		this.movies = Object.keys(this.props.movies);
		this.firebaseRef = firebaseConfig.database.ref('/movies');
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

function MovieAppList (props) {
	const { movie, index } = props;
	const UpvoteButton = <button className="button__upvote" onClick={() => props.upvoteMovie({movie}, index)}>+1</button>;
	const RemoveButton = <button className="button__delete" onClick={() => props.removeMovie(index)}>&times;</button>;

	return (
		<li>
			<span className="yellow">{ movie.name }</span>
			<span className="MovieApp__result-list-likes">{ movie.likes }</span>
			<span className="green"></span>
			<span className="red">{ UpvoteButton }</span>
			<span className="blue hidden">{ RemoveButton }</span>
		</li>
	)
}

export default ListMovie;