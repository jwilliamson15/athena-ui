import React from 'react';
import "./Skill.css";

import {Route, withRouter} from 'react-router-dom';

class SkillSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {skillName: '', skillLevel: ''};

        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
    }

    submitSearch(event) {
        event.preventDefault();
        this.props.history.push('/athena/search/result')
    }

    handleChange(event) {
        this.setState({skillName: event.target.skillName, skillLevel: event.target.skillLevel})
        //TODO - values not persisting...
        console.log("SKill Name: " + this.state.skillName)
        console.log("SKill Level: " + this.state.skillLevel)
    }

    render() {
        return (
            <div className="main-div">
                <h3>Skill Search</h3>
                <div>
                    <form onSubmit={this.submitSearch}>
                        <label>Skill Name: </label>
                        <input type="text" value={this.state.skillName} onChange={this.handleChange} />

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

export default withRouter(SkillSearch);