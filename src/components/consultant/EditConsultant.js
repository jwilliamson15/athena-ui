import React, {useState} from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {saveConsultant} from "../../store/actions";
import axios from "axios";
import * as Constants from "../../constants/constants";
import {Button, InputGroup} from "react-bootstrap";


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

function EditConsultant() {
    const selectedConsultant = useSelector(state => state.selectedConsultant);
    const dispatch = useDispatch();

    function saveConsultantInfo(consultant) {
        apiPutCall(consultant)
        dispatch(saveConsultant(consultant));
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

    return (
        <div style={{marginLeft: "2%"}}>
            <h2 className="mb-3">Edit Consultant</h2>
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
                            {/*TODO - refactor edit/new pages*/}
                            <Field name="employeeNumber" validate={validateMandatoryField} disabled/>
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
                                                    <Field name={`engagementHistory[${index}].name`}/>
                                                </InputGroup.Prepend>

                                                <InputGroup.Prepend className="mb-2">
                                                    <InputGroup.Text>Description</InputGroup.Text>
                                                    <Field name={`engagementHistory[${index}].description`}/>
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