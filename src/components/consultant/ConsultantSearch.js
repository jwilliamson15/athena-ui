import React, {useState} from 'react';
import axios from "axios";
import * as Constants from "../../constants/constants";
import "./Consultant.css";
import ConsultantResult from "./ConsultantResult";
import {useDispatch} from "react-redux";
import {saveConsultant} from '../actions';

function ConsultantSearch() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [employeeNumber, setEmployeeNumber] = useState();

    const handleInputChange = (e) => {
        setEmployeeNumber(e.target.value);
    }

    function performSearch() {
        const queryString = buildSearchQuery();
        setError(false);

        axios
            .get(Constants.API_CONSULTANT_SEARCH_URL + queryString)
            .then(response => {
                if (response.status === 200) {
                    console.log("API GET RESPONSE: " +JSON.stringify(response));
                    dispatch(saveConsultant(response.data));
                    setLoading(false);
                } else {
                    setError(true);
                }
            })
            .catch(error => {
                console.log(error);
                setError(true);
            })
    }

    function buildSearchQuery() {
        let query = new URLSearchParams({
            employeeNumber: employeeNumber
        });

        let queryString = "?" + query.toString();
        console.log("query string: " + queryString);
        return queryString;
    }

    return (
        <div>
            <h3>Consultant Search</h3>
            <div>
                <div>
                    <label htmlFor="employeeNumber">Employee Number:</label>
                    <input name="employeeNumber" value={employeeNumber}
                           onChange={e => handleInputChange(e)}/>
                </div>
                <button onClick={(e) => performSearch()}>Search</button>
                <hr/>

                <div>
                    {
                        (error) ? <h4>Error loading results. Please try again.</h4> : (loading) ?
                            <h4>Loading results</h4> : <ConsultantResult />
                    }
                </div>
            </div>
        </div>
    );
}

export default ConsultantSearch;