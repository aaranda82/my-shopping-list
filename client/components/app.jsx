import React from 'react';
import GradeTable from './gradeTable';
import Header from './header';
import GradeForm from './gradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      gradeToUpdate: {},
      isMobilePortrait: true
    };
    this.newGrade = this.newGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.studentToUpdate = this.studentToUpdate.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.screenSizeCheck = this.screenSizeCheck.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('resize', this.screenSizeCheck);
    try {
      const response = await fetch('/api/grades');
      const grades = await response.json();
      this.setState({ grades });
    } catch (error) {
      console.error(error);
    }
    this.screenSizeCheck();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenSizeCheck);
  }

  screenSizeCheck() {
    this.setState({ isMobilePortrait: window.innerWidth < 420 });
  }

  getAverageGrade() {
    const gradeTotal = this.state.grades.reduce((acc, cur) => acc + parseInt(cur.grade), 0);
    const averageGrade = gradeTotal / this.state.grades.length;
    return !averageGrade ? 0 : averageGrade.toFixed();
  }

  async newGrade(newStudent) {
    const postInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    };
    try {
      const response = await fetch('/api/grades', postInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      const grades = [...this.state.grades, responseJSON];
      this.setState({ grades });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteGrade(event) {
    const id = parseInt(event.target.id);
    const deleteInit = { method: 'DELETE' };
    try {
      const response = await fetch(`/api/grades/${id}`, deleteInit);
      const responseJSON = await response.json();
      const grades = this.state.grades.filter(index => index.studentid !== parseInt(responseJSON));
      this.setState({ grades });
    } catch (error) {
      console.error(error);
    }
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

  async updateGrade(grade) {
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
    try {
      const response = await fetch(`/api/grades/${id}`, updateInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      const grades = [...this.state.grades];
      const indexOfUpdated = grades.findIndex(index => index.studentid === responseJSON.studentid);
      grades[indexOfUpdated] = responseJSON;
      this.setState({ grades });
    } catch (error) {
      console.error(error);
    }
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
            <div id="gradeTable" className="col-12 col-lg-8 mt-5">
              <GradeTable grades={this.state.grades} delete={this.deleteGrade} update={this.studentToUpdate} isMobile={this.state.isMobilePortrait} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
