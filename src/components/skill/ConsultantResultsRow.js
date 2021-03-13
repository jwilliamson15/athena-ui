import React from 'react';
import Table from "react-bootstrap/Table";
import {useDispatch} from "react-redux";
import {saveConsultant, setConsultantLoading} from "../../store/actions";
import {useHistory} from "react-router-dom";
import {CONSULTANT_SEARCH_URL} from "../../constants/constants";

function ConsultantResultsRow(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleClick() {
        dispatch(saveConsultant(props.consultant))
        dispatch(setConsultantLoading(false))
        history.push(CONSULTANT_SEARCH_URL)
    }

    return (
        <tr onClick={(e) => handleClick()}>
            <td>{props.consultant.name}</td>
            <td>{props.consultant.jobRole}</td>
            <td>{props.consultant.personDescription}</td>
            <td>
                <Table borderless size="sm">
                    <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Years Experience</th>
                    </tr>
                    {props.consultant.skills.map(skill => (
                            <React.Fragment>
                                <tr>
                                    <td>{skill.name.toLowerCase()}</td>
                                    <td>{skill.skillLevel.toLowerCase()}</td>
                                    <td>{skill.experienceTime}</td>
                                </tr>
                            </React.Fragment>
                        )
                    )}
                </Table>
            </td>
        </tr>
    )
}

export default ConsultantResultsRow;