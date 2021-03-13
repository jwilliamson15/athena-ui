import React, {useState} from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {saveConsultant, setConsultantLoading} from "../../store/actions";
import axios from "axios";
import * as Constants from "../../constants/constants";
import {Alert, Button, Col, Container, InputGroup, Modal, Row} from "react-bootstrap";
import {
    CONSULTANT_EDIT_URL,
    EMPTY_CONSULTANT_OBJECT,
    HOME_URL,
    NEW_CONSULTANT_URL
} from "../../constants/constants";
import {useHistory} from "react-router-dom";

//TODO - numeric validation on nested fields for skill and engagements
function validateMandatoryField(value) {
    let error;

    if (!value) {
        error = 'Required';
    }

    return error;
}

function validateMandatory200Char(name) {
    let error;

    if (!name) {
        error = 'Required';
    } else if (name.length > 200) {
        error = 'Name must be 200 characters or less';
    }

    return error;
}

function EditConsultant(props) {
    const selectedConsultant = useSelector(state => state.selectedConsultant);
    const dispatch = useDispatch();
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let isNewConsultant = props.isNewConsultant;

    function saveConsultantInfo(consultant) {
        if (isNewConsultant) {
            apiPostCall(consultant)
        } else {
            apiPutCall(consultant)
        }

        dispatch(saveConsultant(consultant))
        dispatch(setConsultantLoading(false))
        history.push(CONSULTANT_EDIT_URL)
    }

    function apiPostCall(consultant) {
        axios.post(
            Constants.API_BASE_URL + "/",
            JSON.stringify(consultant),
            {headers: {"Content-Type": "application/json"}}
        ).then(response => {
            if (response.status == 200) {
                alert("Success!" + consultant.name + "has been added.");
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.toString());
                switch (error.response.status) {
                    case 409:
                        alert("Conflict! This consultant already exists. Please use a unique employee number.");
                        break;
                    case 400:
                        alert("Error" + error.response.status + error.response.data);
                        break;
                    default:
                        break;
                }
            }
        })
    }

    function apiPutCall(consultant) {
        let putUrl = Constants.API_BASE_URL + "/" + consultant.employeeNumber;

        axios
            .put(
                putUrl,
                JSON.stringify(consultant),
                {headers: {"Content-Type": "application/json"}}
            )
            .then(response => {
                if (response.status == 200) {
                    alert(consultant.name + " successfully updated.")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function deleteConsultant() {
        apiDeleteCall()
        dispatch(saveConsultant(EMPTY_CONSULTANT_OBJECT))
        dispatch(setConsultantLoading(true))
        setShowAlert(true);
    }

    function apiDeleteCall() {
        let deleteUrl = Constants.API_BASE_URL + "/" + selectedConsultant.employeeNumber;

        axios
            .delete(deleteUrl)
            .then(response => {
                if (response.status == 200) {
                    console.log("Deleted " + selectedConsultant.employeeNumber);
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    function clearForm() {
        dispatch(saveConsultant(EMPTY_CONSULTANT_OBJECT))
        setConsultantLoading(true)
        history.push(NEW_CONSULTANT_URL)
    }

    const handleCloseModal = () => {
        deleteConsultant();
        setShowModal(false);
    };

    const handleEscapeModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false)
        history.push(HOME_URL);
    }

    return (
        <div style={{marginLeft: "2%"}}>
            <div style={{float: "left"}}
                 className="mb-3">
                {(isNewConsultant) ? <h2>New Consultant</h2> : <h2>Edit Consultant</h2>}
            </div>

            {(isNewConsultant) ?
                //TODO - clear form button/clear form for new consultants
                // <div>
                //     <Button
                //         className="ml-3"
                //         variant="outline-secondary"
                //         onClick={() => clearForm()}>Clear form</Button>
                // </div>
                null
                : <div>
                    <Button style={{
                        position: "absolute",
                        right: "2%"
                    }}
                            variant="danger"
                            onClick={() => handleShowModal()}>Delete Consultant</Button>
                </div>
            }

            <Modal show={showModal} onHide={handleEscapeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Deleting {selectedConsultant.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete {selectedConsultant.name}? This process
                    can not be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEscapeModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleCloseModal}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {(showAlert)
                ? <Alert
                    variant="danger"
                    onClose={() => handleCloseAlert()}
                    className="mt-0"
                    style={{
                        width: "98%"
                    }}
                    dismissible>
                    <Alert.Heading>Consultant Removed</Alert.Heading>
                    <p>
                        This consultant has been removed.
                    </p>
                </Alert> : null
            }


            <Formik
                initialValues={selectedConsultant}
                onSubmit={values =>
                    saveConsultantInfo(values)
                }
                render={({values, errors, touched}) => (
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name="name" validate={validateMandatory200Char}/>
                            {errors.name && touched.name && <div>{errors.name}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Employee Number</InputGroup.Text>
                            </InputGroup.Prepend>
                            {(isNewConsultant) ?
                                <Field name="employeeNumber" validate={validateMandatoryField}/>
                                :
                                <Field name="employeeNumber" validate={validateMandatoryField}
                                       disabled/>
                            }
                            {errors.employeeNumber && touched.employeeNumber &&
                            <div>{errors.employeeNumber}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Job Role</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name="jobRole" validate={validateMandatory200Char}/>
                            {errors.jobRole && touched.jobRole && <div>{errors.jobRole}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name="personDescription"/>
                        </InputGroup>


                        <h4>Skills</h4>
                        <InputGroup className="mb-3">
                            <FieldArray
                                name="skills"
                                render={arrayHelpers => (
                                    <div>
                                        {values.skills.map((skill, index) => (
                                            <div key={index}>
                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Name</InputGroup.Text>
                                                    <Field name={`skills[${index}].name`}/>
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Experience
                                                        Time</InputGroup.Text>
                                                    <Field
                                                        name={`skills[${index}].experienceTime`}/>
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Level</InputGroup.Text>
                                                    <Field as="select"
                                                           name={`skills[${index}].skillLevel`}>
                                                        <option value="">All</option>
                                                        <option value="BASELINE">Baseline
                                                        </option>
                                                        <option value="PROGRESSING">Progressing
                                                        </option>
                                                        <option value="PROFICIENT">Proficient
                                                        </option>
                                                        <option value="EXPERIENCED">Experienced
                                                        </option>
                                                        <option value="MASTER">Master</option>
                                                    </Field>

                                                    <Button variant="outline-danger"
                                                            style={{marginLeft: "2%"}}
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                        Remove Skill
                                                    </Button>
                                                </InputGroup.Prepend>
                                            </div>
                                        ))}
                                        <Button variant="outline-primary"
                                                onClick={() => arrayHelpers.push({
                                                    name: '',
                                                    experienceTime: '',
                                                    skillLevel: ''
                                                })}
                                        >
                                            Add Skill
                                        </Button>
                                    </div>
                                )}
                            />
                        </InputGroup>


                        <h4>Engagement History</h4>
                        <InputGroup className="mb-3">
                            <FieldArray
                                name="engagementHistory"
                                render={arrayHelpers => (
                                    <div>
                                        {values.engagementHistory.map((engagement, index) => (
                                            <div key={index}>
                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Name</InputGroup.Text>
                                                    <Field
                                                        name={`engagementHistory[${index}].name`}/>
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Description</InputGroup.Text>
                                                    <Field
                                                        name={`engagementHistory[${index}].description`}/>
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Duration</InputGroup.Text>
                                                    <Field
                                                        name={`engagementHistory[${index}].duration`}/>


                                                    <Button variant="outline-danger"
                                                            style={{
                                                                marginLeft: "1%",
                                                                minWidth: "180px"
                                                            }}
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                        Remove Engagment
                                                    </Button>
                                                </InputGroup.Prepend>

                                            </div>
                                        ))}
                                        <Button variant="outline-primary"
                                                onClick={() => arrayHelpers.push({
                                                    name: '',
                                                    description: '',
                                                    duration: ''
                                                })}
                                        >
                                            Add Engagement
                                        </Button>
                                    </div>
                                )}
                            />
                        </InputGroup>

                        <div className="pb-5">
                            <Button variant="outline-success"
                                    type="submit">Submit</Button>
                        </div>
                    </Form>

                )}
            />
        </div>
    )
}

export default EditConsultant;