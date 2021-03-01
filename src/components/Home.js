import React from "react";
import { useHistory } from "react-router-dom";
import {SKILL_SEARCH_URL, NEW_CONSULTANT_URL} from "../constants/constants";

function Home() {
    const history = useHistory();

    function skillSearch() {
        history.push(SKILL_SEARCH_URL);
    }

    function newConsultant() {
        history.push(NEW_CONSULTANT_URL);
    }

    return (
        <div className="App">
            <table>
                <tr>
                    <th className="column" onClick={(e) => skillSearch()}>Skill Search</th>
                    {/*<th><Link to="/athena/search">Skill Search</Link></th>*/}
                    <th className="column">Consultant Search
                        {/*<form>*/}
                        {/*    <input type="text" name="conSearch"/>*/}
                        {/*    <input type="submit" name="Search"/>*/}
                        {/*</form>*/}
                    </th>
                    <th className="column" onClick={(e) => newConsultant()}>New Consultant</th>
                </tr>
            </table>
        </div>
    );
}

export default Home;