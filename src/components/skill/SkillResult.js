import React from 'react';
import ConsultantList from "../consultant/ConsultantList";
import "./Skill.css";

const SkillResult = props =>
    <div className="main-div">
        {console.log("SkillResult: " + JSON.stringify(props.result))}
        <h4>Search Results</h4>
        <div className="App">
            <ConsultantList consultants={props.result}/>
        </div>
    </div>

export default SkillResult;