import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

var NavBar = (props) => (
    <Nav bsStyle="pills" className="button-bar">
        <a href="/signup"><Button bsStyle="default" className="nav-button"> Sign Up </Button></a>
        <a href="/login"><Button bsStyle="default" className="nav-button"> Login </Button></a>
        <a href="/bestOf"><Button bsStyle="default" className="nav-button"> Local Favorites </Button></a>
        <a href="/"><img className="logo-center" src='./logo.jpg'/></a>
        <a href={props.navLink}><Button bsStyle="default" className="nav-button float-right pad-right"> {props.navMessage} </Button></a>
        <a href="/about"><Button bsStyle="default" className="nav-button float-right"> About </Button></a>
    </Nav>
);

export default NavBar;
