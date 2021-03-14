import React from 'react';
import SkillResultsTable from "./SkillResultsTable";

const SkillResult = props =>
    <div style={{marginLeft: "1%"}}>
        {console.log("SkillResult: " + JSON.stringify(props.result))}
        <h4>Search Results</h4>
        <div>
            <SkillResultsTable consultants={props.result}/>
        </div>
    </div>

export default SkillResult;