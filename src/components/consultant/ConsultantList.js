import React from 'react';
import Consultant from "./Consultant.js";
import "./Consultant.css";

const ConsultantList = props =>
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
            {props.consultants.map(c => <Consultant key={c.id} consultant={c}/>)}
            </tbody>
        </table>
    </div>

export default ConsultantList;