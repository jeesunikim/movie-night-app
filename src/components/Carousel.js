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
                        this.movies.map(key => 
                            <CarouselSlide
                                key={key}
                                index={key}
                                movies={this.props.movies} 
                                itsInitX={this.state.initX}
                                itsIndex={this.state.index} 
                                itsOffsetX={this.state.offsetX} 
                                movie={this.props.movies[key]}
                                upvoteMovie={this.props.upvoteMovie} 
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
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isHovered: false,
            isModalOpen: false
        }
    }

    mouseOver() {
        this.setState({ isHovered: true});
    }

    mouseOut(){
        this.setState({ isHovered: false});
    }

    handleClick() {
        console.log('handeClick', this.state.isModalOpen)
        this.setState(prevState => ({
            isModalOpen: !prevState.isModalOpen
        }));
    }

    render() {
        const { movie, index } = this.props;
        const UpvoteButton = <button className="button__upvote" onClick={() => this.props.upvoteMovie({movie}, index)}>+1</button>;

        return (
            <div 
                className={`carousel__item ${this.state.isHovered ? "is-hovered" : ""}`}
                aria-hidden="false" 
                aria-describedby={this.props.movie.name}
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
                onClick={this.handleClick}
            >   
                <img src={this.props.movie.imageUrl} alt={this.props.movie.name}/>
                <div className="carousel__item-info">
                    <p>{this.props.movie.name}</p>
                    { UpvoteButton }
                </div>
            </div>
        )
    }
}

function ArrowBtn (props) {
    return (
        <button 
            className={`button__carousel button__carousel--${props.position}`}
            onClick={props.clickPosition}
        >
            {props.position}
        </button>
    )
}

class CarouselModal extends React.Component {
    constructor() {
        super();

        this.fetchMovieInfo = this.fetchMovieInfo.bind(this);

    }

    fetchMovieInfo (query='') {
        const url=`http://www.omdbapi.com/?i=${query}&apikey=e39c95bc&plot=full`;

        fetch(url, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json, ' json');
        }).catch((err) => {
            console.log(err, ' err');
        });
    }
}

export default Carousel;