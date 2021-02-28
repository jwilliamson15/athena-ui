import React from 'react';
import "./App.css"
import {Route, Switch} from "react-router-dom";
import Error from './components/PageNotFound';
import SkillSearch from "./components/skill/SkillSearch";
import SkillResult from "./components/skill/SkillResult";
import Home from './components/Home';
import Header from "./components/Header";
import * as Constants from './constants/constants';
import NewConsultant from "./components/consultant/NewConsultant";

function App() {
    return (
        <main>
            <Header />

            <Switch>
                <Route exact path={Constants.SKILL_SEARCH_RESULT_URL} >
                    <SkillResult />
                </Route>
                <Route exact path={Constants.SKILL_SEARCH_URL} >
                    <SkillSearch />
                </Route>
                <Route exact path={Constants.NEW_CONSULTANT_URL} >
                    <NewConsultant />
                </Route>
                <Route exact path={Constants.HOME_URL} >
                    <Home />
                </Route>
                <Route component={Error}/>
            </Switch>
        </main>
    );
}

export default App;