import React from "react";
import {useHistory} from "react-router-dom";
import {SKILL_SEARCH_URL, NEW_CONSULTANT_URL, CONSULTANT_SEARCH_URL} from "../constants/constants";
import './Home.css';

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
        <table className="homeTable">
            <tbody>
            <tr>
                <td className="hometd" onClick={() => skillSearch()}>Skills Search</td>
                <td className="hometd" onClick={() => consultantSearch()}>Consultant Search</td>
                <td className="hometd" onClick={() => newConsultant()}>New Consultant</td>
            </tr>
            </tbody>
        </table>
    );
}

export default Home;