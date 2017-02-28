import React from 'react';

class ListMovie extends React.Component {
	constructor () {
		super();
	};

	render () {
		
		const { details } = this.props;
		console.log(this.props, '{details.index}')

		return (
			
				<li>
					{details.name} {details.likes}
					<button onClick={() => this.props.upVote({details})}></button>

				</li>
		)
	}

};

export default ListMovie;