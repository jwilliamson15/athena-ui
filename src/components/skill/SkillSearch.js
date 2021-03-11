import React, {useState} from 'react';
import SkillResult from "./SkillResult";
import axios from "axios";
import * as Constants from "../../constants/constants";
import Button from "react-bootstrap/Button";
import {InputGroup, Spinner} from "react-bootstrap";

function SkillSearch() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [results, setResults] = useState([]);
    const [searchParamList, setSearchParamList] = useState([{skillName: "", skillLevel: "ANY"}]);

    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = [...searchParamList];
        list[index][name] = value;
        setSearchParamList(list);
    }

    const handleRemoveClick = index => {
        const list = [...searchParamList];
        list.splice(index, 1);
        setSearchParamList(list);
    }

    const handleAddClick = () => {
        setSearchParamList([...searchParamList, {skillName: "", skillLevel: "ANY"}]);
    }

    function performSearch() {
        const queryString = buildSearchQuery();
        setError(false);

        axios
            .get(Constants.API_SKILL_SEARCH_URL + queryString)
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
            if (searchParam.skillName != "") {
                skillNameArray.push(searchParam.skillName);

                if (searchParam.skillLevel != "") {
                    skillLevelArray.push(searchParam.skillLevel);
                } else {
                    skillLevelArray.push("ANY");
                }
            }
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
        <div style={{marginLeft: "2%"}}>
            <h2>Skill Search</h2>
            <div>
                {searchParamList.map((queryParam, i) => {
                    return (
                        <div>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend >
                                    <InputGroup.Text>Skill Name</InputGroup.Text>
                                </InputGroup.Prepend>
                                <input name="skillName" value={queryParam.skillName}
                                       onChange={e => handleInputChange(e, i)}/>

                                <InputGroup.Prepend style={{marginLeft: "1%"}}>
                                    <InputGroup.Text>Skill Level</InputGroup.Text>
                                </InputGroup.Prepend>
                                <select name="skillLevel" value={queryParam.skillLevel}
                                        onChange={e => handleInputChange(e, i)}>
                                    <option value="ANY">All</option>
                                    <option value="BASELINE">Baseline</option>
                                    <option value="PROGRESSING">Progressing</option>
                                    <option value="PROFICIENT">Proficient</option>
                                    <option value="EXPERIENCED">Experienced</option>
                                    <option value="MASTER">Master</option>
                                </select>

                                {searchParamList.length !== 1 &&
                                <Button variant="outline-danger"
                                        style={{marginLeft: "1%"}}
                                        onClick={() => handleRemoveClick(i)}>Remove</Button>}
                                {searchParamList.length - 1 === i &&
                                <Button variant="outline-primary"
                                        style={{marginLeft: "1%"}}
                                        onClick={handleAddClick}>Add</Button>}
                            </InputGroup>
                        </div>
                    )
                })}

                <div>
                    <Button variant="outline-success"
                            onClick={(e) => performSearch()}>Search</Button>
                </div>
                <hr/>

                <div>
                    {
                        (error) ? <h4>Error loading results. Please try again.</h4> : (loading) ?
                            <Spinner animation="border" variant="secondary"/> : <SkillResult result={results}/>
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillSearch;