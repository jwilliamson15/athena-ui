import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import "./Skill.css";

import {Route, withRouter} from 'react-router-dom';

class SkillSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {skillName: '', skillLevel: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, el) {
        switch(event.target.name) {
            case 'skillName':
                this.setState({skillName: event.target.value})
                break;
            case 'skillLevel':
                this.setState({skillLevel: event.target.value})
                break;
            default:
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(JSON.stringify(this.state));
        this.props.history.push('/athena/search/result')
    }

    render() {
        return (
            <div className="main-div">
                <h3>Skill Search</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>Skill Name: </label>
                        <input type="text" name="skillName" value={this.state.skillName} onChange={this.handleChange} />

                        <label>Level: </label>
                        <select name="skillLevel" value={this.state.skillLevel} onChange={this.handleChange}>
                            <option value="">N/A</option>
                            <option value="BASELINE">Baseline</option>
                            <option value="PROGRESSING">Progressing</option>
                            <option value="PROFICIENT">Proficient</option>
                            <option value="EXPERIENCED">Experienced</option>
                            <option value="MASTER">Master</option>
                        </select>
                        <br/>
                        <input type="submit" value="Search" />
                    </form>
                </div>
            </div>
        )
    }
}

// function SkillSearchFunc() {
//     const { register, handleSubmit } = useForm();
//     const onSubmit = (data) => alert(JSON.stringify(data)); //TODO - try as method like submitSearch above
//
//     return (
//         <div>
//             <h3>Skill Search</h3>
//             <div>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <label>Skill Name: </label>
//                     <input name="skillName" ref={register} />
//
//                     <label>Level: </label>
//                     <select name="skillLevel" ref={register}>
//                         <option value="">N/A</option>
//                         <option value="BASELINE">Baseline</option>
//                         <option value="PROGRESSING">Progressing</option>
//                         <option value="PROFICIENT">Proficient</option>
//                         <option value="EXPERIENCED">Experienced</option>
//                         <option value="MASTER">Master</option>
//                     </select>
//
//                     <input type="submit" value="Search" />
//                 </form>
//             </div>
//         </div>
//     );
// }

export default withRouter(SkillSearch);