import React from "react";
import { DropdownButton, Glyphicon, MenuItem } from 'react-bootstrap';
import {PersonFill} from "react-bootstrap-icons";

class DropDown extends React.Component {
        render() {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems:'center'
                }}>
                    <div style={{
                        display: 'flex',
                        textAlign: 'center'
                    }}>
                        <h3 style={{margin: 0}}>user</h3>
                    </div>
                    <DropdownButton
                        style={{
                            backgroundColor: 'rgba(0,0,0,0)',
                            borderWidth: 0,
                        }}
                        noCaret
                        title={<PersonFill color='white' size={36}/>}
                    >
                        <MenuItem eventKey="1" onClick={this.props.signout}>
                            Sign out
                        </MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                    </DropdownButton>
                </div>

            )
        }
}

export default DropDown;