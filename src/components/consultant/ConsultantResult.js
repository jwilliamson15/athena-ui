import React from 'react';
import "../skill/Skill.css";

const ConsultantResult = props =>
    <div className="main-div">
        {console.log("SkillResult: " + JSON.stringify(props.result))}
        <div className="App">
            <h3>{props.result.name.toString()}</h3>
            <h4>{props.result.jobRole.toString()}</h4>
            <h5>Description</h5><p>{props.result.personDescription.toString()}</p>
            <h5>Employee Number</h5><p>{props.result.employeeNumber.toString()}</p>
            <h5>Skills</h5>
            <p>
                <table>
                    <th className="subTable">Name</th>
                    <th className="subTable">Level</th>
                    <th className="subTable">Years Experience</th>
                    {props.result.skills.map(skill => (
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
                    {props.result.engagementHistory.map(engagement => (
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
    </div>

export default ConsultantResult;