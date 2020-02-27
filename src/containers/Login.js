import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    // async function checkLogin() {
    //     console.log(props);
    //     if (await Auth.currentUserInfo()) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await Auth.signIn(email, password);
            props.setIsAuthenticated(true);
            props.history.push("/");
        } catch (e) {
            alert(e.message);
        }
    }

    return (

        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}