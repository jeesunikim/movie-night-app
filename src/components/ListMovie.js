import React from 'react';

class ListMovie extends React.Component {
	constructor () {
		super();
	};

	render () {
		
		const { details } = this.props;

		return (
			
			<li>
				<img src={details.imageUrl} alt={details.name} />
				{details.name} {details.likes} {details.desc}
				<button onClick={() => this.props.upVote({details})}></button>
			</li>

		)
	}

};

export default ListMovie;