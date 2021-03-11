import React from 'react';
import ConsultantResultsRow from "./ConsultantResultsRow.js";
import Table from 'react-bootstrap/Table'

const ConsultantResultsTable = props =>
    <div>
        <Table striped bordered hover>
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
        </Table>
    </div>

export default ConsultantResultsTable;