import React from 'react';
import ConsultantList from "../consultant/ConsultantList";
import "./Skill.css";

import {Route, withRouter} from 'react-router-dom';

class SkillResult extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //TODO - pass values across
        //alert("passed parameters: " + this.props.location.state.skillName + '-' + this.props.location.state.skillLevel);
    }

    render() {
        return (
        <div className="main-div">
            <h4>Search Results</h4>
            <div className="App">
                <ConsultantList/>
            </div>
        </div>)
    }
}

export default withRouter(SkillResult);