import React, {useState} from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {saveConsultant, setConsultantLoading} from "../../store/actions";
import axios from "axios";
import * as Constants from "../../constants/constants";
import {Alert, Button, Col, Container, InputGroup, Modal, Row} from "react-bootstrap";
import {
    CONSULTANT_EDIT_URL,
    EMPTY_CONSULTANT_OBJECT, EMPTY_ENGAGEMENT_OBJECT, EMPTY_SKILL_OBJECT,
    HOME_URL,
    NEW_CONSULTANT_URL
} from "../../constants/constants";
import {useHistory} from "react-router-dom";
import * as Yup from 'yup';

const consultantValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(200, 'Must be less than 200 characters')
        .required('Required'),
    employeeNumber: Yup.number()
        .positive('Must be a positive whole number')
        .integer('Must be a positive whole number')
        .typeError('Must be numeric')
        .required('Required'),
    jobRole: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(200, 'Must be less than 200 characters'),
    personDescription: Yup.string()
        .min(2, 'Must be at least 2 characters')
        .max(200, 'Must be less than 200 characters'),
    skills: Yup.array().of(Yup.object().shape({
        name: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(200, 'Must be less than 200 characters')
            .required('Required'),
        skillLevel: Yup.string()
            .required('Required'),
        experienceTime: Yup.number()
            .positive('Must be a positive whole number')
            .integer('Must be a positive whole number')
            .typeError('Must be numeric')
            .required('Required')
    })),
    engagementHistory: Yup.array().of(Yup.object().shape({
        name: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .max(200, 'Must be less than 200 characters')
            .required('Required'),
        description: Yup.string()
            .min(2, 'Must be at least 2 characters')
            .required('Required'),
        duration: Yup.number()
            .positive('Must be a positive whole number')
            .integer('Must be a positive whole number')
            .typeError('Must be numeric')
            .required('Required')
    }))
})

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
    }

    const handleEscapeModal = () => {
        setShowModal(false);
    }

    const handleShowModal = () => {
        setShowModal(true);
    }

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
                validationSchema={consultantValidationSchema}
                onSubmit={values =>
                    saveConsultantInfo(values)
                }
                render={({values, errors, touched}) => (
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name="name"/>
                            {errors.name && touched.name && <div>{errors.name}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Employee Number</InputGroup.Text>
                            </InputGroup.Prepend>
                            {(isNewConsultant) ?
                                <Field name="employeeNumber"/>
                                :
                                <Field name="employeeNumber" disabled/>
                            }
                            {errors.employeeNumber && touched.employeeNumber &&
                            <div>{errors.employeeNumber}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Job Role</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name="jobRole"/>
                            {errors.jobRole && touched.jobRole && <div>{errors.jobRole}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field name="personDescription"/>
                            {errors.personDescription && touched.personDescription
                            && <div>{errors.personDescription}</div>}
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
                                                    {errors &&
                                                    errors.skills &&
                                                    errors.skills[index] &&
                                                    errors.skills[index].name &&
                                                    touched &&
                                                    touched.skills &&
                                                    touched.skills[index] &&
                                                    touched.skills[index].name &&
                                                    <div>{errors.skills[index].name}</div>}
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Experience
                                                        Time (years)</InputGroup.Text>
                                                    <Field name={`skills[${index}].experienceTime`}/>
                                                    {errors &&
                                                    errors.skills &&
                                                    errors.skills[index] &&
                                                    errors.skills[index].experienceTime &&
                                                    touched &&
                                                    touched.skills &&
                                                    touched.skills[index] &&
                                                    touched.skills[index].experienceTime &&
                                                    <div>{errors.skills[index].experienceTime}</div>}
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Level</InputGroup.Text>
                                                    <Field as="select"
                                                           name={`skills[${index}].skillLevel`}>
                                                        <option value=""></option>
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
                                                    {errors &&
                                                    errors.skills &&
                                                    errors.skills[index] &&
                                                    errors.skills[index].skillLevel &&
                                                    touched &&
                                                    touched.skills &&
                                                    touched.skills[index] &&
                                                    touched.skills[index].skillLevel &&
                                                    <div>{errors.skills[index].skillLevel}</div>}

                                                    <Button variant="outline-danger"
                                                            style={{marginLeft: "2%"}}
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                        Remove Skill
                                                    </Button>
                                                </InputGroup.Prepend>
                                            </div>
                                        ))}
                                        <Button variant="outline-primary" onClick={() => arrayHelpers.push(EMPTY_SKILL_OBJECT)}>
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
                                                    <Field name={`engagementHistory[${index}].name`}/>
                                                    {errors &&
                                                    errors.engagementHistory &&
                                                    errors.engagementHistory[index] &&
                                                    errors.engagementHistory[index].name &&
                                                    touched &&
                                                    touched.engagementHistory &&
                                                    touched.engagementHistory[index] &&
                                                    touched.engagementHistory[index].name &&
                                                    <div>{errors.engagementHistory[index].name}</div>}
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Description</InputGroup.Text>
                                                    <Field name={`engagementHistory[${index}].description`}/>
                                                    {errors &&
                                                    errors.engagementHistory &&
                                                    errors.engagementHistory[index] &&
                                                    errors.engagementHistory[index].description &&
                                                    touched &&
                                                    touched.engagementHistory &&
                                                    touched.engagementHistory[index] &&
                                                    touched.engagementHistory[index].description &&
                                                    <div>{errors.engagementHistory[index].description}</div>}
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Duration (years)</InputGroup.Text>
                                                    <Field name={`engagementHistory[${index}].duration`}/>
                                                    {errors &&
                                                    errors.engagementHistory &&
                                                    errors.engagementHistory[index] &&
                                                    errors.engagementHistory[index].duration &&
                                                    touched &&
                                                    touched.engagementHistory &&
                                                    touched.engagementHistory[index] &&
                                                    touched.engagementHistory[index].duration &&
                                                    <div>{errors.engagementHistory[index].duration}</div>}

                                                    <Button variant="outline-danger"
                                                            style={{
                                                                marginLeft: "1%",
                                                                minWidth: "180px"
                                                            }}
                                                            onClick={() => arrayHelpers.remove(index)}>
                                                        Remove Engagement
                                                    </Button>
                                                </InputGroup.Prepend>

                                            </div>
                                        ))}
                                        <Button variant="outline-primary" onClick={() => arrayHelpers.push(EMPTY_ENGAGEMENT_OBJECT)}>
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