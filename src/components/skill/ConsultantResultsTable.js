import React from 'react';
import ConsultantResultsRow from "./ConsultantResultsRow.js";
import "../consultant/Consultant.css";

const ConsultantResultsTable = props =>
    <div>
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Job Role</th>
                <th>Description</th>
                <th>Skills</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {props.consultants.map(c => <ConsultantResultsRow key={c.id} consultant={c}/>)}
            </tbody>
        </table>
    </div>

export default ConsultantResultsTable;