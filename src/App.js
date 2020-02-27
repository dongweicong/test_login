import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { Auth } from "aws-amplify";
import IdleTimer from 'react-idle-timer'
import "./App.css";
import Routes from "./Routes";


function App(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        onLoad();
    }, []);

    function _onAction(e) {
        console.log('user did something', e);
    }

    function _onActive(e) {
        console.log('user is active', e);
        console.log('time remaining', timer.getRemainingTime());
    }

    async function _onIdle(e) {
        console.log('user is idle', e);
        console.log('last active', timer.getLastActiveTime());

        await handleLogout();

        // console.log('user is signed out')

    }

    async function onLoad() {
        try {
            console.log(await Auth.currentSession());
            setIsAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        setIsAuthenticating(false);
    }

    async function handleLogout() {
        await Auth.signOut();

        setIsAuthenticated(false);
        props.history.push("/login");
    }



  return (
      !isAuthenticating &&
      <div>
          <IdleTimer
              ref={ref => setTimer(ref)}
              element={document}
              onActive={_onActive}
              onIdle={_onIdle}
              onAction={_onAction}
              debounce={250}
              timeout={1000 * 60 * 3}
          />
          <Navbar collapseOnSelect expand="lg" variant="dark" class="navbar">
              <div className="navbar-header">
                  <a className="navbar-brand headerHeight flexVertical" href="#">
                      <img src={require('./images/webroot_white.png')} style={{width:200, position: "absolute", left: 24}}/>
                  </a>
              </div>
              <Navbar.Collapse>
                  <Nav style={{
                      position: 'absolute',
                      right: 5
                  }}>
                      {isAuthenticated
                          ? //<a class="logout-btn" href="/login" role="button">Logout</a>
                          <div className="navbar-header">
                              <div className="headerHeight flexVertical">

                                  <Button onClick={handleLogout}>Logout</Button>
                              </div>

                          </div>
                          : <br />
                      }
                  </Nav>
              </Navbar.Collapse>

          </Navbar>
          <Routes appProps={{ isAuthenticated, setIsAuthenticated }} />
      </div>
  );
}

export default withRouter(App);