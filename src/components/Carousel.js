import React from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.movies = Object.keys(this.props.movies);

        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);

        this.state = {
            index: 0,
            initX: 0,
            offsetX: 0
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

class CarouselSlide extends React.Component {
    constructor(props) {
        super(props);

        this.mouseOver = this.mouseOver.bind(this);
        this.mouseOut = this.mouseOut.bind(this);

        this.state = {
            isHovered: false
        }
    }

    mouseOver() {
        this.setState({ isHovered : true});
        console.log('meow');
    }

    mouseOut(){
        this.setState({ isHovered : false});
    }

    render() {
        return (
            <div 
                className={`carousel__item ${this.state.isHovered ? 'meow' : 'rofl'}`}
                aria-hidden="false" 
                aria-describedby={this.props.movie.name}
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            >
                { this.props.movie.name }
                <img className={this.state.isHovered ? "is-hovered" : ""}src={this.props.movie.imageUrl} alt={this.props.movie.name}/>
            </div>
        )
    }
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