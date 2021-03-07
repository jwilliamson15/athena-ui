import React from 'react';
import ConsultantResultsTable from "./ConsultantResultsTable";
import "./Skill.css";

const SkillResult = props =>
    <div className="main-div">
        {console.log("SkillResult: " + JSON.stringify(props.result))}
        <h4>Search Results</h4>
        <div className="App">
            <ConsultantResultsTable consultants={props.result}/>
        </div>
    </div>

export default SkillResult;