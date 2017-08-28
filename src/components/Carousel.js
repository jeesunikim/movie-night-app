import React from 'react';

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.onHover = this.onHover.bind(this);

        this.state = {
            index: 0,
            // initX: -1070,
            initX: 0,
            offsetX: 0,
            hover: ""
        }

    }

    onClickPrev() {
        const { index } = this.state;
        const previousIndex = index - 1;
        this.setState({
            index: previousIndex,
            offsetX: -214 * previousIndex
            // offsetX: this.state.initX * previousIndex
        })
    }

    onClickNext() {
        const { index } = this.state;
        const nextIndex = index > Object.keys(this.props.movies).length ? 1 : index + 1;

        console.log(index, 'index', nextIndex, ' nextIndex')
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
            <div className={`carousel is-transition`}>
                <ArrowBtn 
                    position="left" 
                    clickPosition={this.onClickPrev} 
                />
                {
                    Object.keys(this.props.movies)
                    .map(key => 
                        <CarouselSlide
                            movies={this.props.movies} 
                            itsInitX={this.state.initX}
                            itsIndex={this.state.index} 
                            itsOffsetX={this.state.offsetX} 
                            movie={this.props.movies[key]} 
                            key={key}
                            index={key}
                        />
                    )
                }
                <ArrowBtn 
                    position="right" 
                    clickPosition={this.onClickNext} 
                />
            </div>
        )
    }
}

function CarouselSlide (props) {
    const { movie, index } = props;
    console.log(props.itsIndex, ' props.itsIndex');

    return (
        <div 
            className={`carousel__item`}
            data-slide-index={index} 
            aria-hidden="false" 
            aria-describedby={`slide${index}`}
            style={{
                width: (Object.keys(movie).length + 10) * 214,
                transform: `translate3d(${props.itsIndex > Object.keys(movie).length ? props.itsInitX : props.itsInitX + props.itsOffsetX}px, 0, 0)`
            }}
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