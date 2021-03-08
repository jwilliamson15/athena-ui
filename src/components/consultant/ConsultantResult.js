import React from 'react';
import EditConsultant from "./EditConsultant";
import "../skill/Skill.css";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {CONSULTANT_EDIT_URL} from "../../constants/constants";

function ConsultantResult() {
    const selectedConsultant = useSelector(state => state.selectedConsultant);

    return (
        <div className="main-div">
            <div className="App">
                <h3>{selectedConsultant.name.toString()}</h3>
                <h4>{selectedConsultant.jobRole.toString()}</h4>
                <h5>Description</h5><p>{selectedConsultant.personDescription.toString()}</p>
                <h5>Employee Number</h5><p>{selectedConsultant.employeeNumber.toString()}</p>
                <h5>Skills</h5>
                <p>
                    <table>
                        <th className="subTable">Name</th>
                        <th className="subTable">Level</th>
                        <th className="subTable">Years Experience</th>
                        {selectedConsultant.skills.map(skill => (
                            <React.Fragment>
                                <tr>
                                    <td>{skill.name.toLowerCase()}</td>
                                    <td>{skill.skillLevel.toLowerCase()}</td>
                                    <td>{skill.experienceTime}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </table>
                </p>
                <h5>Engagement History</h5>
                <p>
                    <table>
                        <th className="subTable">Name</th>
                        <th className="subTable">Description</th>
                        <th className="subTable">Duration (years)</th>
                        {selectedConsultant.engagementHistory.map(engagement => (
                            <React.Fragment>
                                <tr>
                                    <td>{engagement.name.toLowerCase()}</td>
                                    <td>{engagement.description.toLowerCase()}</td>
                                    <td>{engagement.duration}</td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </table>
                </p>
            </div>

            <hr/>
            <Link to={CONSULTANT_EDIT_URL} >
                <button>Edit</button>
            </Link>
        </div>
    )
}

export default ConsultantResult;