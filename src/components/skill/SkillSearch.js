import React, { useState } from 'react';
import "./Skill.css";
import SkillResult from "./SkillResult";
import axios from "axios";
import * as Constants from "../../constants/constants";

function SkillSearch() {
    const [skillName, setSkillName] = useState("");
    const [skillLevel, setSkillLevel] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);

    const handleSkillNameChange = event => {
        setSkillName(event.target.value);
    };

    const handleSkillLevelChange = event => {
        setSkillLevel(event.target.value);
    };

    const performSearch = () => {
        let queryString = buildSearchQuery();

        setError(false);
        axios
            .get(Constants.API_SEARCH_URL + queryString)
            .then(response => {
                const searchResults = response.data.map(c => {
                    return {
                        id: c._id,
                        name: c.name,
                        employeeNumber: c.employeeNumber,
                        jobRole: c.jobRole,
                        description: c.personDescription,
                        skills: c.skills
                    };
                });
                setResults(searchResults);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })

    }

    function buildSearchQuery() {
        let queryString = "?";
        if (skillName !="") {
            const skillsQuery = "skills=" + skillName;
            queryString += skillsQuery;
        }
        if (skillLevel !="") {
            const levelQuery = "&skillLevel=" + skillLevel;
            queryString += levelQuery;
        }

        return queryString;
    }

    return (
        <div>
            <h3>Skill Search</h3>
            <div>
                <label>Skill Name:</label>
                <input name="skillName" value={skillName} onChange={handleSkillNameChange} />

                <label>Skill Level:</label>
                <select name="skillLevel" value={skillLevel} onChange={handleSkillLevelChange} >
                    <option value="">N/A</option>
                    <option value="BASELINE">Baseline</option>
                    <option value="PROGRESSING">Progressing</option>
                    <option value="PROFICIENT">Proficient</option>
                    <option value="EXPERIENCED">Experienced</option>
                    <option value="MASTER">Master</option>
                </select>
                <button onClick={(e) => performSearch()} >Search</button>
                <hr />

                <div>
                    {
                        (error) ? <h4>Error loading results. Please try again.</h4> : (loading) ? <h4>Loading results</h4> : <SkillResult result={results} />
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillSearch;