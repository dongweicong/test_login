import React from "react";
import IdleTimer from 'react-idle-timer'
import "./Home.css";

import RequireLogin from "../common/RequireLogin"
import { Auth } from "aws-amplify";

class Home extends React.Component{

    render() {

        Auth.currentSession()
            .then(data => {
                let idToken = data.getIdToken();
                console.dir(idToken);
                let email = idToken.payload.email;
                console.log(email);
            })
            .catch(err => console.log(err));

        return (

            <div className="Home">
                <div className="lander">
                    <h1>Home</h1>
                </div>
            </div>
        );
    }

};

export default Home;