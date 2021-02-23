import React from 'react';
import "./App.css"

class App extends React.Component {

  componentDidMount() {
    //TODO - anything needed here???
  }

  skillSearch(e) {
      this.props.history.push('/athena/search')
  }

  newConsultant(e) {

  }

  render() {
    return (
        <div className="App">
            <table>
                <tr>
                    <th className="column">Skill Search
                        <button className="button button-new" onClick={(e) => this.skillSearch(e)}>Search Skills</button>
                    </th>
                    <th className="column">Consultant Search
                        <form>
                            <input type="text" name="conSearch"/>
                            <input type="submit" name="Search"/>
                        </form>
                    </th>
                    <th className="column">New Consultant
                        <button className="button button-new" onClick={(e) => this.newConsultant(e)}>Add New Consultant</button>
                    </th>
                </tr>
          </table>
        </div>
    )
  }
}

export default App;