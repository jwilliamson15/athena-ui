import React, {useState} from 'react';
import axios from "axios";
import * as Constants from "../../constants/constants";
import ConsultantResult from "./ConsultantResult";
import {useDispatch} from "react-redux";
import {saveConsultant} from '../actions';
import Button from "react-bootstrap/Button";
import {InputGroup, Spinner} from "react-bootstrap";

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
        <div style={{marginLeft: "2%"}}>
            <h3>Consultant Search</h3>
            <div>
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Employee Number</InputGroup.Text>
                    </InputGroup.Prepend>
                    <input name="employeeNumber" value={employeeNumber}
                           onChange={e => handleInputChange(e)}/>
                </InputGroup>
                <Button variant="outline-success"
                        onClick={(e) => performSearch()}>Search</Button>
                <hr/>

                <div>
                    {
                        (error) ? <h4>Error loading results. Please try again.</h4> : (loading) ?
                            <Spinner animation="border" variant="secondary" /> : <ConsultantResult />
                    }
                </div>
            </div>
        </div>
    );
}

export default ConsultantSearch;