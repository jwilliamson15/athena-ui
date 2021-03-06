import React, { useState } from 'react';
import "./Skill.css";
import SkillResult from "./SkillResult";
import axios from "axios";
import * as Constants from "../../constants/constants";

function SkillSearch() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [searchParamList, setSearchParamList] = useState([{skillName: "", skillLevel: ""}]);

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...searchParamList];
        list[index][name] = value;
        setSearchParamList(list);
    }

    const handleRemoveClick = index => {
        const list = [...searchParamList];
        list.splice(index,1);
        setSearchParamList(list);
    }

    const handleAddClick = () => {
        setSearchParamList([...searchParamList, { skillName: "", skillLevel: "" }]);
    }

    function performSearch() {
        const queryString = buildSearchQuery();
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
        let skillNameArray = [];
        let skillLevelArray = [];

        searchParamList.forEach(searchParam => {
            skillNameArray.push(searchParam.skillName);
            skillLevelArray.push(searchParam.skillLevel);
        });

        let query = new URLSearchParams({
            skills: skillNameArray,
            skillLevel: skillLevelArray
        });

        let queryString = "?" + query.toString();
        console.log("query string: " + queryString);
        return queryString;
    }

    return (
        <div>
            <h3>Skill Search</h3>
            <div>
                {searchParamList.map((queryParam, i) => {
                    return (
                        <div>
                            <label>Skill Name:</label>
                            <input name="skillName" value={queryParam.skillName}
                                   onChange={e => handleInputChange(e, i)}/>

                            <label>Skill Level:</label>
                            <select name="skillLevel" value={queryParam.skillLevel}
                                    onChange={e => handleInputChange(e, i)}>
                                <option value="">All</option>
                                <option value="BASELINE">Baseline</option>
                                <option value="PROGRESSING">Progressing</option>
                                <option value="PROFICIENT">Proficient</option>
                                <option value="EXPERIENCED">Experienced</option>
                                <option value="MASTER">Master</option>
                            </select>
                            {searchParamList.length !== 1 &&
                                <button onClick={() => handleRemoveClick(i)}>Remove</button>}
                            {searchParamList.length - 1 === i &&
                                <button onClick={handleAddClick}>Add</button>}
                        </div>
                    )
                })}
                <button onClick={(e) => performSearch()}>Search</button>
                <hr/>

                <div>
                    {
                        (error) ? <h4>Error loading results. Please try again.</h4> : (loading) ?
                            <h4>Loading results</h4> : <SkillResult result={results} />
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillSearch;