import React from 'react';
import GradeTable from './gradeTable';
import Header from './header';
import GradeForm from './gradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      gradeToUpdate: {}
    };
    this.newGrade = this.newGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.studentToUpdate = this.studentToUpdate.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(grades => this.setState({ grades }))
      .catch(err => { console.error(`Error: ${err}`); });
  }

  getAverageGrade() {
    const gradeTotal = this.state.grades.reduce((acc, cur) => acc + parseInt(cur.grade), 0);
    const averageGrade = gradeTotal / this.state.grades.length;
    return !averageGrade ? 0 : averageGrade.toFixed();
  }

  newGrade(newStudent) {
    const postInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    };
    fetch('/api/grades', postInit)
      .then(response => response.json())
      .then(newGrade => {
        const grades = [...this.state.grades];
        grades.push(newGrade);
        return this.setState({ grades });
      })
      .catch(err => { console.error(`Error: ${err}`); });
  }

  deleteGrade(event) {
    const id = parseInt(event.target.id);
    const deleteInit = { method: 'DELETE' };
    fetch(`/api/grades/${id}`, deleteInit)
      .then(() => {
        const grades = this.state.grades.filter(index => index.id !== id);
        return this.setState({ grades });
      })
      .catch(err => { console.error(`Error: ${err}`); });
  }

  studentToUpdate(event) {
    const { name, title, value, id } = event.target;
    this.setState({
      gradeToUpdate: {
        name,
        course: title,
        grade: value,
        id
      }
    });
  }

  updateGrade(grade) {

    const updateInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        course: grade.course,
        name: grade.name,
        grade: parseInt(grade.grade)
      })
    };
    const id = parseInt(grade.id);
    fetch(`/api/grades/${id}`, updateInit)
      .then(res => res.json())
      .then(updatedGrade => {
        const grades = [...this.state.grades];
        const indexOfUpdated = grades.findIndex(index => index.id === updatedGrade.id);
        grades[indexOfUpdated] = updatedGrade;
        return this.setState({ grades });
      })
      .catch(err => console.error(`An error occured: ${err}`));
  }

  render() {
    return (
      <>
        <div id="gradeArea" className="container">
          <div className="row">
            <div id="header" className="col-12 col-sm-6 col-lg-12">
              <Header average={this.getAverageGrade()} />
            </div>
            <div id="gradeForm" className="col-9 col-sm-6 col-lg-4 ml-5 ml-sm-0 pt-5">
              <GradeForm newGrade={this.newGrade} gradeToUpdate={this.state.gradeToUpdate} updateGrade={this.updateGrade} />
            </div>
            <div id="gradeTable" className="col-12 col-lg-8">
              <GradeTable grades={this.state.grades} delete={this.deleteGrade} update={this.studentToUpdate} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
