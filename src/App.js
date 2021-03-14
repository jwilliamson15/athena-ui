import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Error from './components/PageNotFound';
import SkillSearch from "./components/skill/SkillSearch";
import SkillResult from "./components/skill/SkillResult";
import ConsultantSearch from "./components/consultant/ConsultantSearch";
import EditConsultant from "./components/consultant/EditConsultant";
import Home from './components/Home';
import Header from "./components/Header";
import Footer from "./components/Footer";
import * as Constants from './constants/constants';

function App() {
    return (
        <main>
            <Link to={Constants.HOME_URL} style={{ textDecoration: 'none' }}>
                <Header />
            </Link>

            <Switch>
                <Route exact path={Constants.SKILL_SEARCH_RESULT_URL} >
                    <SkillResult />
                </Route>
                <Route exact path={Constants.SKILL_SEARCH_URL} >
                    <SkillSearch />
                </Route>
                <Route exact path={Constants.CONSULTANT_SEARCH_URL} >
                    <ConsultantSearch />
                </Route>
                <Route exact path={Constants.NEW_CONSULTANT_URL} >
                    <EditConsultant isNewConsultant={true}/>
                </Route>
                <Route exact path={Constants.CONSULTANT_EDIT_URL} >
                    <EditConsultant isNewConsultant={false}/>
                </Route>
                <Route exact path={Constants.HOME_URL} >
                    <Home />
                </Route>
                <Route component={Error}/>
            </Switch>

            <Footer />
        </main>
    );
}

export default App;