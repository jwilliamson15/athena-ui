import React from "react";
import {useHistory} from "react-router-dom";
import {SKILL_SEARCH_URL, NEW_CONSULTANT_URL, CONSULTANT_SEARCH_URL} from "../constants/constants";

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
        <table style={{
            width: "95%",
            height: "78vh",
            marginLeft: "2.5%",
            textAlign: "center",
            tableLayout: "fixed",
            fontSize: "47pt"
        }}>
            <tbody>
            <tr>
                <td style={{
                    border: "1px solid lightgray"
                }}
                    onClick={() => skillSearch()}>Skills Search
                </td>
                <td style={{
                    border: "1px solid lightgray"
                }}
                    onClick={() => consultantSearch()}>Consultant Search
                </td>
                <td style={{
                    border: "1px solid lightgray"
                }}
                    onClick={() => newConsultant()}>New Consultant
                </td>
            </tr>
            </tbody>
        </table>
    );
}

export default Home;