import React from "react";
import {useHistory} from "react-router-dom";
import {SKILL_SEARCH_URL, NEW_CONSULTANT_URL, CONSULTANT_SEARCH_URL} from "../constants/constants";
import {Col, Container, Row} from "react-bootstrap";

function Home() {
    const history = useHistory();

    function skillSearch() {
        history.push(SKILL_SEARCH_URL);
    }

    function newConsultant() {
        history.push(NEW_CONSULTANT_URL);
    }

    function consultantSearch() {
        history.push(CONSULTANT_SEARCH_URL);
    }

    return (
        <Container fluid style={{
            textAlign: "center"
        }}>
            <Row>
                <Col style={{
                    border: "1pt solid lightgrey",
                    borderRadius: "10px"
                }} onClick={(e) => skillSearch()}>
                    <h2>Skill Search</h2>
                </Col>
                <Col style={{
                    border: "1pt solid lightgrey",
                    borderRadius: "10px"
                }} onClick={(e) => consultantSearch()}><h2>Consultant Search</h2></Col>
                <Col style={{
                    border: "1pt solid lightgrey",
                    borderRadius: "10px"
                }} onClick={(e) => newConsultant()}><h2>New Consultant</h2></Col>
            </Row>
        </Container>
    );
}

export default Home;