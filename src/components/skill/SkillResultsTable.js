import React from 'react';
import SkillResultsRow from "./SkillResultsRow.js";
import Table from 'react-bootstrap/Table'

const SkillResultsTable = props =>
    <div style={{
        width: "97%"
    }}>
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Job Role</th>
                <th>Description</th>
                <th>Skills</th>
            </tr>
            </thead>
            <tbody>
            {props.consultants.map(c => <SkillResultsRow key={c.id} consultant={c}/>)}
            </tbody>
        </Table>
    </div>

export default SkillResultsTable;