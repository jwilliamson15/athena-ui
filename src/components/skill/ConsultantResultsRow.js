import React from 'react';
import Table from "react-bootstrap/Table";

class ConsultantResultsRow extends React.Component {
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
                    <Table borderless size="sm">
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Years Experience</th>
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
                    )}
                    </Table>
                </td>

                {/*TODO -- actions??*/}
                <td>
                    {/*<button onClick={(e) => this.updateUser(this.props.user.id, e)}>Edit</button>*/}
                    {/*<button onClick={(e) => this.deleteUser(this.props.user.id, e)}>Delete</button>*/}
                </td>
            </tr>
        )
    }
}

export default ConsultantResultsRow;