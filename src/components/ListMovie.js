import React from 'react';

class ListMovie extends React.Component {
	constructor () {
		super();
	};

	upVote () {
		const movies = { ...this.props.movies }

	}

	render () {
		
		const { details } = this.props;
		console.log(this.props.index, '{details.index}')

		return (
			
				<li>
					{details.name} {details.likes}
					<button onClick={() => this.upVote}></button>

				</li>
		)
	}

};

export default ListMovie;