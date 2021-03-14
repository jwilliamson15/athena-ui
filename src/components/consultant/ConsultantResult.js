import React from 'react';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {CONSULTANT_EDIT_URL} from "../../constants/constants";
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";

function ConsultantResult() {
    const selectedConsultant = useSelector(state => state.selectedConsultant);

    return (
        <div>
            <div>
                <Card>
                    <Card.Body>
                        <div className="mb-5" style={{
                            position: "absolute",
                            right: "2%"
                        }}>
                            <Link to={CONSULTANT_EDIT_URL}>
                                <Button variant="outline-info">Edit</Button>
                            </Link>
                        </div>
                        <Card.Title>{selectedConsultant.name.toString()}</Card.Title>
                        <Card.Subtitle
                            className="mb-3">{selectedConsultant.jobRole.toString()}</Card.Subtitle>
                        <Card.Text>
                            <b>Description</b>
                            <p>{selectedConsultant.personDescription.toString()}</p>

                            <b>Employee Number</b>
                            <p>{selectedConsultant.employeeNumber.toString()}</p>

                            <Container fluid>
                                <Row>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Skills</Card.Title>
                                                <Card.Text>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Level</th>
                                                            <th>Years Experience</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {selectedConsultant.skills.map(skill => (
                                                            <React.Fragment>
                                                                <tr>
                                                                    <td>{skill.name.toLowerCase()}</td>
                                                                    <td>{skill.skillLevel.toLowerCase()}</td>
                                                                    <td>{skill.experienceTime}</td>
                                                                </tr>
                                                            </React.Fragment>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Card.Title>Engagement History</Card.Title>
                                                <Card.Text>
                                                    <Table striped bordered hover>
                                                        <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Description</th>
                                                            <th>Duration (years)</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {selectedConsultant.engagementHistory.map(engagement => (
                                                            <React.Fragment>
                                                                <tr>
                                                                    <td>{engagement.name.toLowerCase()}</td>
                                                                    <td>{engagement.description.toLowerCase()}</td>
                                                                    <td>{engagement.duration}</td>
                                                                </tr>
                                                            </React.Fragment>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default ConsultantResult;