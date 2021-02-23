import React from 'react';
import "./Consultant.css";

import {Route, withRouter} from 'react-router-dom';

class Consultant extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr>
                <td>{this.props.consultant.name}</td>
                <td>{this.props.consultant.jobRole}</td>
                <td>{this.props.consultant.description}</td>
                <td>{this.props.consultant.skills.map(skill => (
                        <React.Fragment>
                            <tr>
                                <th>Name</th>
                                <th>Level</th>
                                <th>Years Experience</th>
                            </tr>
                            <tr>
                                <td>{skill.name}</td>
                                <td>{skill.skillLevel}</td>
                                <td>{skill.experienceTime}</td>
                            </tr>
                        </React.Fragment>
                    )
                )}</td>

                <td>
                    {/*<button className="button button-edit" onClick={(e) => this.updateUser(this.props.user.id, e)}>Edit</button>*/}
                    {/*<button className="button button-delete" onClick={(e) => this.deleteUser(this.props.user.id, e)}>Delete</button>*/}
                </td>
            </tr>
        )
    }
}

export default withRouter(Consultant);