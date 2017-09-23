import React from 'react';

const POSTER_WIDTH = 214;
const TOTAL_LEGTH = 6;

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.movies = Object.keys(this.props.movies);

        this.onClickPrev = this.onClickPrev.bind(this);
        this.onClickNext = this.onClickNext.bind(this);
        this.getSelectedMovieID = this.getSelectedMovieID.bind(this);

        this.state = {
            index: 0,
            initX: 0,
            offsetX: 0,
            selectedMovie: "",
            isSelectedMovieOn: false
        }
    }

    onClickPrev() {
        const { index } = this.state;
        const previousIndex = index == 0 ? 0 : index - 1;
        
        this.setState({
            index: previousIndex,
            offsetX: -POSTER_WIDTH * previousIndex
        })
    }

    onClickNext() {
        const { index } = this.state;
        const nextIndex = index + TOTAL_LEGTH === this.movies.length ? index : index + 1;

        this.setState({
            index: nextIndex,
            offsetX: -POSTER_WIDTH * nextIndex
        })
    }

    getSelectedMovieID(selectedMovieValue) {
        this.setState({ 
            selectedMovie: selectedMovieValue,
            isSelectedMovieOn: true 
        }, () => {
            console.log(this.state.selectedMovie , ' getSelectedMovieID is being called');
        }) 
        // thought this was weird. first call returns an empty. But second click doesn't.
        // https://stackoverflow.com/questions/37847028/react-setstate-not-working-on-first-try-but-works-on-second
    }

    render() {
        
        return (
            <div className={`carousel ${this.state.isSelectedMovieOn ? "has-open-jaw" : ""}`}>
                <ArrowBtn 
                    position="left" 
                    clickPosition={this.onClickPrev} 
                />
                <div 
                    className="carousel__items is-transition"
                    style={{
                        width: (this.movies.length) * POSTER_WIDTH,
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
                                onSelectMovie={this.getSelectedMovieID}
                            />
                        )
                    }
                </div>
                <ArrowBtn 
                    position="right" 
                    clickPosition={this.onClickNext} 
                />
                <CarouselOpenJaw 
                    movie={this.state.selectedMovie}
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
            isHovered: false
        }
    }

    mouseOver() {
        this.setState({ isHovered: true });
    }

    mouseOut(){
        this.setState({ isHovered: false });
    }

    handleClick() {
        this.props.onSelectMovie(this.props.movie.imdbID);
        // https://stackoverflow.com/questions/38394015/how-to-pass-data-from-child-component-to-its-parent-in-reactjs
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

class CarouselOpenJaw extends React.Component {
    constructor(props) {
        super(props);

        this.fetchMovieInfo = this.fetchMovieInfo.bind(this);

        this.state = {
            movieInfo: ""
        }
    }

    componentWillReceiveProps(props) {
        this.fetchMovieInfo(props.movie);
    }

    fetchMovieInfo (imdbID) {
        const url=`http://www.omdbapi.com/?i=${imdbID}&apikey=e39c95bc&plot=full`;

        fetch(url, {
            method: 'GET'
        }).then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json, ' json');
            this.setState({ movieInfo: json });
        }).catch((err) => {
            console.log(err, ' err');
        });
    }

    render() {
        return (
            <div className="carousel__jaw">
                <div className="carousel__jaw-info">
                    <span className="title">{this.state.movieInfo.Title}</span>
                    <p>{this.state.movieInfo.Plot}</p>
                </div>
                <div className="carousel__jaw-image">
                    <img src={this.state.movieInfo.Poster} alt={this.state.movieInfo.Title} />
                </div>
            </div>
        )
    }
}

export default Carousel;