import React from 'react';
import axios from "axios";
import Consultant from "./Consultant.js";
import * as Constants from '../../constants';
import "./Consultant.css";

import {Route, withRouter} from 'react-router-dom';

class ConsultantList extends React.Component {
    state = {
        consultants: []
    };

    componentDidMount() {
        axios
            .get(Constants.API_URL)
            .then(response => {
                const searchResults = response.data.map(c => {
                    return {
                        id: c._id,
                        name: c.name,
                        employeeNumber: c.employeeNumber,
                        jobRole: c.jobRole,
                        description: c.personDescription,
                        skills: c.skills
                    };
                });
                const newState = Object.assign({}, this.state, {
                    consultants: searchResults
                });
                this.setState(newState);
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
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
                        {this.state.consultants.map(c => <Consultant key={c.id} consultant={c} />)}
                    </tbody>
                </table>
            </div>)
    }
}

export default withRouter(ConsultantList);