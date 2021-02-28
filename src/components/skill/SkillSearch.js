import React from 'react';
import "./Skill.css";
import SkillResult from "./SkillResult";
import axios from "axios";
import * as Constants from "../../constants/constants";

function SkillSearch() {
    const [skillName, setSkillName] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [results, setResults] = React.useState([]);

    const handleChange = event => {
        setSkillName(event.target.value);
    };

    const performSearch = (skillName) => {
        if (skillName != "") {
            axios
                .get(Constants.API_SEARCH_URL + "?skills=" + skillName)
                .then(response => {
                    const searchResults = response.data.map(c => {
                        return {
                            id: c._id,
                            name: c.name,
                            employeeNumber: c.employeeNumber,
                            jobRole: c.jobRole,
                            description: c.personDescription,
                            skills: c.skills
                        };
                    });
                    setResults(searchResults);
                    setLoading(false);
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <h3>Skill Search</h3>
            <div>
                {/*<form onSubmit={handleChange} >*/}
                    <label>Skill Name: </label>
                    <input name="skillName" value={skillName} onChange={handleChange} />
                    <button onClick={(e) => performSearch(skillName)} >Search</button>

                {/*    <label>Level: </label>*/}
                {/*    <select name="skillLevel" ref={searchTerm}>*/}
                {/*        <option value="">N/A</option>*/}
                {/*        <option value="BASELINE">Baseline</option>*/}
                {/*        <option value="PROGRESSING">Progressing</option>*/}
                {/*        <option value="PROFICIENT">Proficient</option>*/}
                {/*        <option value="EXPERIENCED">Experienced</option>*/}
                {/*        <option value="MASTER">Master</option>*/}
                {/*    </select>*/}

                {/*    <input type="submit" value="Search" />*/}
                {/*</form>*/}

                <hr />
                <div>
                    {
                        (loading) ? <h4>Loading results</h4> : <SkillResult result={results} />
                    }
                </div>

            </div>
        </div>
    );
}

export default SkillSearch;


// function SkillSearchFunc() {
//     const history = useHistory();
//     const { register, handleSubmit } = useForm();
//
//     const onSubmit = (data) => (
//         console.log("SkillSearch: " + JSON.stringify(data)),
//             history.push(Constants.SKILL_SEARCH_RESULT_URL, {search: data})
//     );
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




// class SkillSearch extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {skillName: '', skillLevel: ''};
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//     handleChange(event, el) {
//         switch(event.target.name) {
//             case 'skillName':
//                 this.setState({skillName: event.target.value})
//                 break;
//             case 'skillLevel':
//                 this.setState({skillLevel: event.target.value})
//                 break;
//             default:
//                 break;
//         }
//     }
//
//     handleSubmit(event) {
//         event.preventDefault();
//         console.log(JSON.stringify(this.state));
//         this.props.history.push('/athena/search/result');
//     }
//
//     render() {
//         return (
//             <div className="main-div">
//                 <h3>Skill Search</h3>
//                 <div>
//                     <form onSubmit={this.handleSubmit}>
//                         <label>Skill Name: </label>
//                         <input type="text" name="skillName" value={this.state.skillName} onChange={this.handleChange} />
//
//                         <label>Level: </label>
//                         <select name="skillLevel" value={this.state.skillLevel} onChange={this.handleChange}>
//                             <option value="">N/A</option>
//                             <option value="BASELINE">Baseline</option>
//                             <option value="PROGRESSING">Progressing</option>
//                             <option value="PROFICIENT">Proficient</option>
//                             <option value="EXPERIENCED">Experienced</option>
//                             <option value="MASTER">Master</option>
//                         </select>
//                         <br/>
//                         <input type="submit" value="Search" />
//                     </form>
//                 </div>
//             </div>
//         )
//     }
// }

