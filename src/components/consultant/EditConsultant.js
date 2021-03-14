import React, {useState} from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {saveConsultant, setConsultantLoading} from "../../store/actions";
import axios from "axios";
import * as Constants from "../../constants/constants";
import {
    Alert,
    Button,
    Card,
    CardDeck,
    Col,
    Container,
    InputGroup,
    Modal,
    Row
} from "react-bootstrap";
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    let isNewConsultant = props.isNewConsultant;

    const [showInformationModal, setShowInformationModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");
    const [modalVariant, setModalVariant] = useState("");

    function saveConsultantInfo(consultant) {
        if (isNewConsultant) {
            apiPostCall(consultant)
        } else {
            apiPutCall(consultant)
        }
    }

    function apiPostCall(consultant) {
        axios.post(
            Constants.API_BASE_URL + "/",
            JSON.stringify(consultant),
            {headers: {"Content-Type": "application/json"}}
        ).then(response => {
            if (response.status == 200) {
                handleInformationModal("success", "Added " + consultant.name,
                    consultant.name + " has been successfully added.");
                dispatch(saveConsultant(consultant))
                dispatch(setConsultantLoading(false))
                history.push(CONSULTANT_EDIT_URL)
            }
        }).catch(error => {
            console.log("Caught error: " + error.toString())
            if (error.response) {
                console.log(error.response.toString());
                switch (error.response.status) {
                    case 409:
                        handleInformationModal("warning", "Conflict",
                            "This consultant already exists. Please use a unique employee number.");
                        break;
                    case 400:
                        handleInformationModal("danger", "Error",
                            "An error has occurred. Please try again. Error code: " + error.response.status);
                        break;
                    default:
                        handleInformationModal("danger", "Error",
                            "An error has occurred. Please try again. Error code: " + error.response.status);
                        break;
                }
            } else {
                handleInformationModal("danger", "Error",
                    "An error has occurred. Please try again. \n\n" +error);
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
                    handleInformationModal("success", "Updated " + consultant.name,
                        consultant.name + " has been successfully updated.");
                }
            })
            .catch(error => {
                handleInformationModal("danger", "Error",
                    "An error has occurred. Please try again. \n\n" +error);
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

    const handleCloseModal = () => {
        deleteConsultant();
        setShowDeleteModal(false);
    }

    const handleEscapeModal = () => {
        setShowDeleteModal(false);
        setShowInformationModal(false);
    }

    const handleCloseAlert = () => {
        setShowAlert(false)
        history.push(HOME_URL);
    }

    const handleInformationModal = (variant, title, message) => {
        setModalVariant(variant);
        setModalTitle(title);
        setModalMessage(message);
        setShowInformationModal(true);
    }

    const initialiseForm = () => {
        if (isNewConsultant) {
            return EMPTY_CONSULTANT_OBJECT;
        } else {
            return selectedConsultant;
        }
    }

    return (
        <div style={{marginLeft: "2%"}}>
            <div style={{float: "left"}}
                 className="mb-3">
                {(isNewConsultant) ? <h2>New Consultant</h2> : <h2>Edit Consultant</h2>}
            </div>

            {(isNewConsultant) ?
                null
                : <div>
                    <Button style={{
                        position: "absolute",
                        right: "2%"
                    }}
                            variant="danger"
                            onClick={() => setShowDeleteModal(true)}>Delete Consultant</Button>
                </div>
            }

            <Modal show={showDeleteModal} onHide={handleEscapeModal} centered>
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

            <Modal show={showInformationModal} onHide={handleEscapeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant={modalVariant} onClick={handleEscapeModal}>Confirm</Button>
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
                initialValues={initialiseForm()}
                validationSchema={consultantValidationSchema}
                onSubmit={values =>
                    saveConsultantInfo(values)
                }
                render={({values, errors, touched}) => (
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{width: "202px"}}>Full
                                    Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field style={{width: "300px"}} name="name"/>
                            {errors.name && touched.name &&
                            <div className="ml-3" style={{color: "red"}}>{errors.name}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{width: "202px"}}>Employee
                                    Number</InputGroup.Text>
                            </InputGroup.Prepend>
                            {(isNewConsultant) ?
                                <Field style={{width: "300px"}} name="employeeNumber"/>
                                :
                                <Field style={{width: "300px"}} name="employeeNumber" disabled/>
                            }
                            {errors.employeeNumber && touched.employeeNumber &&
                            <div className="ml-3"
                                 style={{color: "red"}}>{errors.employeeNumber}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{width: "202px"}}>Job Role</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field style={{width: "300px"}} name="jobRole"/>
                            {errors.jobRole && touched.jobRole &&
                            <div className="ml-3" style={{color: "red"}}>{errors.jobRole}</div>}
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    style={{width: "202px"}}>Description</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Field style={{width: "300px"}} name="personDescription"/>
                            {errors.personDescription && touched.personDescription
                            && <div className="ml-3"
                                    style={{color: "red"}}>{errors.personDescription}</div>}
                        </InputGroup>

                        <h4>Skills</h4>
                        <InputGroup className="mb-3">
                            <FieldArray
                                name="skills"
                                render={arrayHelpers => (
                                    <div>
                                        <CardDeck>
                                            {values.skills.map((skill, index) => (
                                                <div key={index}>
                                                    <Card className="mb-3">
                                                        <Card.Body>
                                                            <Container>
                                                                <Card.Text>
                                                                    <Row>
                                                                        <InputGroup.Prepend
                                                                            className="mb-2">
                                                                            <InputGroup.Text
                                                                                style={{width: "202px"}}>Name</InputGroup.Text>
                                                                            <Field
                                                                                name={`skills[${index}].name`}/>
                                                                        </InputGroup.Prepend>
                                                                    </Row>
                                                                    {errors &&
                                                                    errors.skills &&
                                                                    errors.skills[index] &&
                                                                    errors.skills[index].name &&
                                                                    touched &&
                                                                    touched.skills &&
                                                                    touched.skills[index] &&
                                                                    touched.skills[index].name &&
                                                                    <Row className="mb-3"
                                                                         style={{color: "red"}}>{errors.skills[index].name}</Row>}

                                                                    <Row>
                                                                        <InputGroup.Prepend
                                                                            className="mb-2">
                                                                            <InputGroup.Text>Experience
                                                                                Time
                                                                                (years)</InputGroup.Text>
                                                                            <Field
                                                                                name={`skills[${index}].experienceTime`}/>
                                                                        </InputGroup.Prepend>
                                                                    </Row>
                                                                    {errors &&
                                                                    errors.skills &&
                                                                    errors.skills[index] &&
                                                                    errors.skills[index].experienceTime &&
                                                                    touched &&
                                                                    touched.skills &&
                                                                    touched.skills[index] &&
                                                                    touched.skills[index].experienceTime &&
                                                                    <Row className="mb-3"
                                                                         style={{color: "red"}}>{errors.skills[index].experienceTime}</Row>}

                                                                    <Row>
                                                                        <InputGroup.Prepend
                                                                            className="mb-2">
                                                                            <InputGroup.Text>Level</InputGroup.Text>
                                                                            <Field as="select"
                                                                                   style={{position: "relative"}}
                                                                                   name={`skills[${index}].skillLevel`}>
                                                                                <option
                                                                                    value=""></option>
                                                                                <option
                                                                                    value="BASELINE">Baseline
                                                                                </option>
                                                                                <option
                                                                                    value="PROGRESSING">Progressing
                                                                                </option>
                                                                                <option
                                                                                    value="PROFICIENT">Proficient
                                                                                </option>
                                                                                <option
                                                                                    value="EXPERIENCED">Experienced
                                                                                </option>
                                                                                <option
                                                                                    value="MASTER">Master
                                                                                </option>
                                                                            </Field>
                                                                        </InputGroup.Prepend>
                                                                    </Row>
                                                                    {errors &&
                                                                    errors.skills &&
                                                                    errors.skills[index] &&
                                                                    errors.skills[index].skillLevel &&
                                                                    touched &&
                                                                    touched.skills &&
                                                                    touched.skills[index] &&
                                                                    touched.skills[index].skillLevel &&
                                                                    <Row className="mb-3"
                                                                         style={{color: "red"}}>{errors.skills[index].skillLevel}</Row>}

                                                                    <Row>
                                                                        <Button
                                                                            variant="outline-danger"
                                                                            onClick={() => arrayHelpers.remove(index)}>
                                                                            Remove Skill
                                                                        </Button>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Container>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            ))}
                                        </CardDeck>
                                        <Button variant="outline-primary"
                                                onClick={() => arrayHelpers.push(EMPTY_SKILL_OBJECT)}>
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
                                        <CardDeck>
                                            {values.engagementHistory.map((engagement, index) => (
                                                <div key={index}>
                                                    <Card className="mb-3">
                                                        <Card.Body>
                                                            <Container>
                                                                <Card.Text>
                                                                    <Row>
                                                                        <InputGroup.Prepend
                                                                            className="mb-2">
                                                                            <InputGroup.Text
                                                                                style={{width: "202px"}}>Name</InputGroup.Text>
                                                                            <Field
                                                                                name={`engagementHistory[${index}].name`}/>
                                                                        </InputGroup.Prepend>
                                                                    </Row>
                                                                    {errors &&
                                                                    errors.engagementHistory &&
                                                                    errors.engagementHistory[index] &&
                                                                    errors.engagementHistory[index].name &&
                                                                    touched &&
                                                                    touched.engagementHistory &&
                                                                    touched.engagementHistory[index] &&
                                                                    touched.engagementHistory[index].name &&
                                                                    <Row className="mb-3"
                                                                         style={{color: "red"}}>{errors.engagementHistory[index].name}</Row>}

                                                                    <Row>
                                                                        <InputGroup.Prepend
                                                                            className="mb-2">
                                                                            <InputGroup.Text
                                                                                style={{width: "202px"}}>Description</InputGroup.Text>
                                                                            <Field
                                                                                name={`engagementHistory[${index}].description`}/>
                                                                        </InputGroup.Prepend>
                                                                    </Row>
                                                                    {errors &&
                                                                    errors.engagementHistory &&
                                                                    errors.engagementHistory[index] &&
                                                                    errors.engagementHistory[index].description &&
                                                                    touched &&
                                                                    touched.engagementHistory &&
                                                                    touched.engagementHistory[index] &&
                                                                    touched.engagementHistory[index].description &&
                                                                    <Row className="mb-3"
                                                                         style={{color: "red"}}>{errors.engagementHistory[index].description}</Row>}

                                                                    <Row>
                                                                        <InputGroup.Prepend
                                                                            className="mb-2">
                                                                            <InputGroup.Text
                                                                                style={{width: "202px"}}>Duration
                                                                                (years)</InputGroup.Text>
                                                                            <Field
                                                                                name={`engagementHistory[${index}].duration`}/>
                                                                        </InputGroup.Prepend>
                                                                    </Row>
                                                                    {errors &&
                                                                    errors.engagementHistory &&
                                                                    errors.engagementHistory[index] &&
                                                                    errors.engagementHistory[index].duration &&
                                                                    touched &&
                                                                    touched.engagementHistory &&
                                                                    touched.engagementHistory[index] &&
                                                                    touched.engagementHistory[index].duration &&
                                                                    <Row className="mb-3"
                                                                         style={{color: "red"}}>{errors.engagementHistory[index].duration}</Row>}

                                                                    <Row>
                                                                        <Button
                                                                            variant="outline-danger"
                                                                            style={{
                                                                                marginLeft: "1%",
                                                                                minWidth: "180px"
                                                                            }}
                                                                            onClick={() => arrayHelpers.remove(index)}>
                                                                            Remove Engagement
                                                                        </Button>
                                                                    </Row>
                                                                </Card.Text>
                                                            </Container>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            ))}
                                        </CardDeck>
                                        <Button variant="outline-primary"
                                                onClick={() => arrayHelpers.push(EMPTY_ENGAGEMENT_OBJECT)}>
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