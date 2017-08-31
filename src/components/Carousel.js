import React from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.movies = Object.keys(this.props.movies);

        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onHover = this.onHover.bind(this);

        this.state = {
            index: 0,
            initX: 0,
            offsetX: 0,
            hover: ""
        }
    }

    onClickPrev() {
        const { index } = this.state;
        const previousIndex = index == 0 ? 0 : index - 1;
        
        this.setState({
            index: previousIndex,
            offsetX: -214 * previousIndex
        })
    }

    onClickNext() {
        const { index } = this.state;
        const nextIndex = index + 5 === this.movies.length ? index : index + 1;

        this.setState({
            index: nextIndex,
            offsetX: -214 * nextIndex
        })
    }
  
    onHover(index) {
      this.setState({ hover: index });
    }

    render() {
        
        return (
            <div className="carousel">
                <ArrowBtn 
                    position="left" 
                    clickPosition={this.onClickPrev} 
                />
                <div 
                    className={`carousel__items is-transition`}
                    style={{
                    width: (this.movies.length) * 214,
                    transform: `translate3d(${this.state.index > this.movies.length ? this.state.initX : this.state.initX + this.state.offsetX}px, 0, 0)`
                    }}
                >
                    {
                        this.movies
                        .map(key => 
                            <CarouselSlide
                                movies={this.props.movies} 
                                itsInitX={this.state.initX}
                                itsIndex={this.state.index} 
                                itsOffsetX={this.state.offsetX} 
                                movie={this.props.movies[key]} 
                                key={key}
                            />
                        )
                    }
                </div>
                <ArrowBtn 
                    position="right" 
                    clickPosition={this.onClickNext} 
                />
            </div>
        )
    }
}

function CarouselSlide (props) {
    const { movie, itsIndex } = props;

    return (
        <div 
            className="carousel__item"
            aria-hidden="false" 
            aria-describedby={movie.name}
        >
            { movie.name }
            <img src={movie.imageUrl} alt={movie.name}/>
        </div>
    )
}

function ArrowBtn (props) {
    return (
        <button 
            className={`carousel__btn ${props.position}`}
            onClick={props.clickPosition}
        >
            {props.position}
        </button>
    )
}

export default Carousel;