import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SkillSearch from "./components/skill/SkillSearch";
import './App.css';
import './index.css';

import {Route, Link, BrowserRouter as Router} from "react-router-dom";

import * as serviceWorker from './serviceWorker.js';

const routing = (
    <Router>
        <div>
            <header className="App-header">
                <h2>Athena</h2>
                <h4>Skills Profiling</h4>
            </header>
            <Route exact path="/athena" component={App} />
            <Route exact path="/athena/search" component={SkillSearch} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.unregister();
