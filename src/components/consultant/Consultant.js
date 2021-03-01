import React from 'react';
import "./Consultant.css";

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
                <td>
                    <tr>
                        <th className="subTable">Name</th>
                        <th className="subTable">Level</th>
                        <th className="subTable">Years Experience</th>
                    </tr>
                    {this.props.consultant.skills.map(skill => (
                        <React.Fragment>
                            <tr>
                                <td>{skill.name.toLowerCase()}</td>
                                <td>{skill.skillLevel.toLowerCase()}</td>
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

export default Consultant;