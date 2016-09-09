import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import SearchApp from './components/SearchApp.js';
import VoteApp from './components/VoteApp.js';
import AboutPage from './components/AboutPage.js';
import BestOf from './components/BestOf.js';
import Gallery from './components/Gallery.js';
import { GoogleMap, GoogleMapLoader, Marker, SearchBox } from "react-google-maps";

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={SearchApp} />
        <Route path="/vote" component={VoteApp} />
        <Route path="/about" component={AboutPage} />
        <Route path='/bestOf' component={BestOf} />
        <Route path='/gallery' component={Gallery}/>
    </Router>
), document.getElementById("app"));
