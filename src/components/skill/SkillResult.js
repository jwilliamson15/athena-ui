import React from 'react';
import ConsultantResultsTable from "./ConsultantResultsTable";

const SkillResult = props =>
    <div style={{marginLeft: "1%"}}>
        {console.log("SkillResult: " + JSON.stringify(props.result))}
        <h4>Search Results</h4>
        <div>
            <ConsultantResultsTable consultants={props.result}/>
        </div>
    </div>

export default SkillResult;