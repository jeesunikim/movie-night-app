import React, { Component } from "react";
// import Firebase from "firebase";
// import firebaseConfig from "../../firebase";

interface State {
    imageURLs: [];
}

interface Props {
    movie: any;
    index: number;
    removeMovie: (index: number) => void;
    upvoteMovie: (movie: {}) => void;
}

class MovieListItem extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            imageURLs: []
        };
    }

    // public getAvatar(uid: any) {
    //     [].concat(uid).forEach(eachUID => {
    //         firebaseConfig.database
    //             .ref("/users/" + eachUID)
    //             .once("value")
    //             .then(snapshot => {
    //                 if (snapshot.val() !== null) {
    //                     this.setState({
    //                         imageURLs: this.state.imageURLs.concat(
    //                             snapshot.val().photoURL
    //                         )
    //                     });
    //                 }
    //             });
    //     });
    // }

    public componentDidMount() {
        // this.getAvatar(Object.keys(this.props.movie.stars || {}));
    }

    public render() {
        const { movie, index, upvoteMovie, removeMovie } = this.props;
        const pics = this.state.imageURLs.map((url: string) => {
            return <img src={url} key={`image_${url}`} />;
        });

        const UpvoteButton = (
            <button
                className="button__upvote"
                onClick={() => upvoteMovie({ movie })}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="100 -30 190 150"
                >
                    <path
                        className="heart-icon"
                        d="M251.5,45.5c0-17.8-11.1-34.6-28.9-34.6c-9,0-16.6,6.3-22.4,12.7c-5.7-6.3-13-12.7-21.8-12.7 c-17.8,0-29.9,16.8-29.9,34.6c0,24.7,37.2,51.1,52.4,51.1C217.5,96.6,251.5,67.7,251.5,45.5z"
                    />
                </svg>
            </button>
        );
        const RemoveButton = (
            <button
                className="button__delete"
                onClick={() => removeMovie(index)}
            >
                &times;
            </button>
        );
        // const likedUsers = movie.stars ? (
        //     <span className="MovieApp__result-list-avatars">{pics}</span>
        // ) : (
        //     <span className="MovieApp__result-list-avatars">empty</span>
        // );

        return (
            <li>
                <span className="MovieApp__result-list-title">
                    {movie.name}
                </span>
                <span className="MovieApp__result-list-likes">
                    {movie.likes}
                </span>
                {/* {likedUsers} */}
                <span className="MovieApp__result-list-upvote">
                    {UpvoteButton}
                </span>
                <span className="blue hidden">{RemoveButton}</span>
            </li>
        );
    }
}

// function _MovieListItem(props) {
//     const { movie, index, avatar } = props;

//     const UpvoteButton = (
//         <button
//             className="button__upvote"
//             onClick={() => props.upvoteMovie({ movie }, index)}
//         >
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="100 -30 190 150">
//                 <path
//                     className="heart-icon"
//                     d="M251.5,45.5c0-17.8-11.1-34.6-28.9-34.6c-9,0-16.6,6.3-22.4,12.7c-5.7-6.3-13-12.7-21.8-12.7 c-17.8,0-29.9,16.8-29.9,34.6c0,24.7,37.2,51.1,52.4,51.1C217.5,96.6,251.5,67.7,251.5,45.5z"
//                 />
//             </svg>
//         </button>
//     );
//     const RemoveButton = (
//         <button
//             className="button__delete"
//             onClick={() => props.removeMovie(index)}
//         >
//             &times;
//         </button>
//     );
//     const likedUsers = movie.stars ? (
//         <span className="MovieApp__result-list-avatars">
//             {getAvatar(Object.keys(movie.stars), avatar)}
//         </span>
//     ) : (
//         <span className="MovieApp__result-list-avatars">empty</span>
//     );
//     // const likedUsers = movie.stars ? <span className="MovieApp__result-list-avatars">{ avatar }</span> : <span className="MovieApp__result-list-avatars">empty</span>;

//     return (
//         <li>
//             <span className="MovieApp__result-list-title">{movie.name}</span>
//             <span className="MovieApp__result-list-likes">{movie.likes}</span>
//             {likedUsers}
//             <span className="MovieApp__result-list-upvote">{UpvoteButton}</span>
//             <span className="blue hidden">{RemoveButton}</span>
//         </li>
//     );
// }

export default MovieListItem;
