import React from 'react';
import {Formik, Form, Field, FieldArray} from 'formik';

function validateMandatoryField(value) {
    let error;

    if (!value) {
        error = 'Required';
    }

    return error;
}

function validateMandatory200Char(name) {
    let error;

    if(!name) {
        error = 'Required';
    } else if (name.length > 200) {
        error = 'Name must be 200 characters or less';
    }

    return error;
}

const EditConsultant = () => (
    <div>
        <Formik
            initialValues={{
                name: '',
                employeeNumber: '',
                jobRole: '',
                personDescription: '',
                skills: [{name: '', experienceTime: '', skillLevel: ''}],
                engagementHistory: [{name: '', description: '', duration: ''}]
            }}
            onSubmit={values =>
                alert(JSON.stringify(values, null, 2))
            }
            render={({values, errors, touched}) => (
                <Form>
                    <div>
                        <label>Name:</label>
                        <Field name="name" validate={validateMandatory200Char}/>
                        {errors.name && touched.name && <div>{errors.name}</div>}
                    </div>

                    <div>
                        <label>Employee Number: </label>
                        <Field name="employeeNumber" validate={validateMandatoryField} />
                        {errors.employeeNumber && touched.employeeNumber && <div>{errors.employeeNumber}</div>}
                    </div>

                    <div>
                        <label>Job Role:</label>
                        <Field name="jobRole" validate={validateMandatory200Char} />
                        {errors.jobRole && touched.jobRole && <div>{errors.jobRole}</div>}
                    </div>

                    <div>
                        <label>Description:</label>
                        <Field name="personDescription"/>
                    </div>

                    <div>
                        <h3>Skills</h3>
                        <FieldArray
                            name="skills"
                            render={arrayHelpers => (
                                <div>
                                    {values.skills.map((skill, index) => (
                                        <div key={index}>
                                            <div>
                                                <label>Name:</label>
                                                <Field name={`skills[${index}].name`}/>
                                            </div>

                                            <div>
                                                <label>Experience Time:</label>
                                                <Field name={`skills[${index}].experienceTime`}/>
                                            </div>

                                            <div>
                                                <label>Level</label>
                                                <Field as="select"
                                                       name={`skills[${index}].skillLevel`}>
                                                    <option value="">All</option>
                                                    <option value="BASELINE">Baseline</option>
                                                    <option value="PROGRESSING">Progressing</option>
                                                    <option value="PROFICIENT">Proficient</option>
                                                    <option value="EXPERIENCED">Experienced</option>
                                                    <option value="MASTER">Master</option>
                                                </Field>


                                                <button type="button"
                                                        onClick={() => arrayHelpers.remove(index)}>
                                                    Remove Skill
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push({
                                            name: '',
                                            experienceTime: '',
                                            skillLevel: ''
                                        })}
                                    >
                                        Add Skill
                                    </button>
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <h3>Engagement History</h3>
                        <FieldArray
                            name="engagementHistory"
                            render={arrayHelpers => (
                                <div>
                                    {values.engagementHistory.map((engagement, index) => (
                                        <div key={index}>
                                            <div>
                                                <label>Name:</label>
                                                <Field name={`engagementHistory[${index}].name`}/>
                                            </div>

                                            <div>
                                                <label>Decscription:</label>
                                                <Field
                                                    name={`engagementHistory[${index}].description`}/>
                                            </div>

                                            <div>
                                                <label>Duration:</label>
                                                <Field
                                                    name={`engagementHistory[${index}].duration`}/>

                                                <button type="button"
                                                        onClick={() => arrayHelpers.remove(index)}>
                                                    Remove Engagement
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => arrayHelpers.push({
                                            name: '',
                                            description: '',
                                            duration: ''
                                        })}
                                    >
                                        Add Engagement
                                    </button>
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </Form>

            )}
        />
    </div>
);

export default EditConsultant;