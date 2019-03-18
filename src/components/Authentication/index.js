import React, { Component } from "react";
import axios from "axios";
import { auth, database } from "../../../firebase";

if (!process.env.SLACK_CLIENT_ID) {
    throw new Error("no SLACK CLIENT ID");
}

const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID;

export default class Autentication extends Component {
    constructor() {
        super();

        this.state = {
            uid: null,
            userName: null,
            userPhoto: null
        };
    }

    componentDidMount() {
        this.slackAuth();
    }

    componentWillUnmount() {
        this.logout();
    }

    async slackAuth() {
        try {
            const response = await axios.get("/api/users");
            const userData = await response.data;

            this.firebaseAuth(userData);
        } catch (error) {
            console.error(error);
        }
    }

    firebaseAuth(userData) {
        auth.signInWithCustomToken(userData.firebaseToken).catch(error => {
            console.error(error);
        });

        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe();

            if (user) {
                const userRef = database.ref("/users/" + auth.currentUser.uid);

                userRef
                    .set({
                        username: userData.userName,
                        photoURL: userData.userPic
                    })
                    .then(() => {
                        console.log("Synchronization succeeded");
                    })
                    .catch(() => {
                        console.log("Synchronization failed");
                    });

                this.setState({
                    uid: auth.currentUser.uid,
                    userName: userData.userName,
                    userPhoto: userData.userPic
                });
            } else {
                this.setState({ uid: null });
            }
        });
    }

    logout = () => {
        auth.signOut().then(() => {
            this.setState({ uid: null });
        });
    };

    renderLogin = () => {
        return (
            <nav className="login">
                <p>Sign in to vote or submit a movie</p>
                <a
                    href={`https://slack.com/oauth/authorize?client_id=${SLACK_CLIENT_ID}&scope=identity.avatar,identity.basic,identity.email,identity.team`}
                >
                    <img
                        alt="Sign in with Slack"
                        height="40"
                        width="172"
                        src="https://platform.slack-edge.com/img/sign_in_with_slack.png"
                        srcSet="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x"
                    />
                </a>
            </nav>
        );
    };

    render() {
        const logout = <button onClick={this.logout}>Log out!</button>;

        // check if they are logged in
        if (!this.state.uid) {
            return (
                <div className="MovieApp__authentication">
                    <span>{this.renderLogin()}</span>
                </div>
            );
        } else {
            return (
                <div className="MovieApp__authentication">
                    <span>
                        Hello <strong>{this.state.userName}</strong>
                    </span>
                    <img
                        className="avatar_image"
                        src={this.state.userPhoto}
                        alt="user's slack picture"
                        width="32px"
                        height="32px"
                    />
                    {logout}
                </div>
            );
        }
    }
}
