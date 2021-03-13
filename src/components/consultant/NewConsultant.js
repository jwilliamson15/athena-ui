import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {saveConsultant} from "../../store/actions";
import * as Constants from "../../constants/constants";
import axios from "axios";
import {Field, FieldArray, Form, Formik} from "formik";
import {Button, InputGroup} from "react-bootstrap";
import FormBootStrap from "react-bootstrap/Form";

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

function validateNumericValue(value) {
    let error;

    if (![0-99].test(value)) {
        error = "Must be a numeric value"
    }

    return error;
}

function NewConsultant() {
    const selectedConsultant = useSelector(state => state.selectedConsultant);
    const dispatch = useDispatch();

    function saveConsultantInfo(consultant) {
        apiPostCall(consultant)
        dispatch(saveConsultant(consultant));
    }

    function apiPostCall(consultant) {
        axios
            .post(
                Constants.API_BASE_URL+"/",
                JSON.stringify(consultant),
                {headers: {"Content-Type": "application/json"}}
            )
            .then(response => {
                if (response.status == 200) {
                    alert(consultant.name + " successfully added.")
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.toString());
                    switch (error.response.status) {
                        case 409:
                            alert(consultant.name + " already exists.\nPlease search consultants to edit or use a unique Employee Number and resubmit.")
                            break;
                        case 400:
                            alert("Error: " + error.response.status + error.response.data)
                            break;
                        default:
                            break;
                    }
                }
            })
    }

    return (
        <div style={{marginLeft: "2%"}}>
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
                            <Field name="employeeNumber" validate={validateMandatoryField} />
                            {errors.employeeNumber && touched.employeeNumber && <div>{errors.employeeNumber}</div>}
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

                        <h3>Skills</h3>
                        <InputGroup className="mb-3">
                            <FieldArray
                                name="skills"
                                render={arrayHelpers => (
                                    <div>
                                        {values.skills.map((skill, index) => (
                                            <div key={index}>
                                                <InputGroup.Prepend className="mb-3">
                                                    <InputGroup.Text>Name</InputGroup.Text>
                                                    <Field name={`skills[${index}].name`}/>
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend>
                                                    <InputGroup.Text>Experience Time</InputGroup.Text>
                                                    <Field
                                                        name={`skills[${index}].experienceTime`}
                                                    />
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

                        <h3>Engagement History</h3>
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
                                                    <Field name={`engagementHistory[${index}].duration`}/>


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

export default NewConsultant;