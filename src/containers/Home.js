import React from "react";
import "./Home.css";
import RequireLogin from "../common/RequireLogin"

class Home extends React.Component{
    render() {

        return (
            <div className="Home">
                <div className="lander">
                    <h1>Scratch</h1>
                </div>
            </div>
        );
    }
};

export default Home;