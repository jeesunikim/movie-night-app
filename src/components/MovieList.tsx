import React, { Component } from "react";
import MovieListItem from "./MovieListItem";

interface Props {
    movies: {
        [key: string]: "";
    };
    removeMovie: () => void;
    upvoteMovie: () => void;
}

export const MovieList = (props: Props) => {
    const { movies, removeMovie, upvoteMovie } = props;
    return (
        <div className="MovieApp__result">
            <span className="small">Results for</span>
            <h2>The movie of the month</h2>
            <ul className="MovieApp__result-list">
                {Object.keys(movies).map((key: string, index) => (
                    <MovieListItem
                        key={key}
                        index={index}
                        // movies={movies}
                        movie={movies[key]}
                        removeMovie={removeMovie}
                        upvoteMovie={upvoteMovie}
                    />
                ))}
            </ul>
        </div>
    );
    // }
};
