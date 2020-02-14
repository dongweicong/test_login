import React from "react";
import { Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";

export default (ChildComponent) => {
    class Composed extends React.Component {
        componentDidMount() {
            this.checkLogin();
        }

        state = {
            loggedin: true
        };

        async checkLogin() {
            const loggedin = await Auth.currentUserInfo();
            if (!loggedin) {
                this.setState({
                    loggedin: false
                });
            }
        }

        render() {
            if (this.state.loggedin) {
                return <ChildComponent/>;
            } else {
                return <Redirect to={"/login"}/>
            }
        }
    }

    return Composed;
}