import React from 'react';

class ListFetchMovies extends React.Component {

	render () {

		const { details } = this.props;

		return (
			<li onClick={(evt) => this.props.updateMovie({details})}>
				{details.Title}  {details.Year}
			</li>
		)
	}

};

ListFetchMovies.propTypes = {
	details: React.PropTypes.object.isRequired,
	updateMovie: React.PropTypes.func.isRequired
}

export default ListFetchMovies;