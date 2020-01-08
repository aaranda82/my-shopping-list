import React from 'react';
import GradeTable from './gradeTable';
import Header from './header';
import GradeForm from './gradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.newGrade = this.newGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(parsedResponse => {
        this.setState({
          grades: parsedResponse
        });
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  getAverageGrade() {
    let gradeTotal = null;
    const length = this.state.grades.length;
    for (let index = 0; index < length; index++) {
      gradeTotal = (gradeTotal || 0) + this.state.grades[index].grade;
    }
    const averageGrade = gradeTotal / length;
    return !averageGrade ? 0 : averageGrade.toFixed();
  }

  newGrade(newStudent) {
    const postInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    };
    fetch('/api/grades', postInit)
      .then(response => {
        return response.json();
      })
      .then(parsedResponse => {
        const currentState = [...this.state.grades];
        currentState.push(parsedResponse);
        this.setState({
          grades: currentState
        });
      })
      .catch(err => {
        console.error('Error: ', err);
      });
  }

  deleteGrade(event) {
    const id = parseInt(event.target.id);
    const deleteInit = { method: 'DELETE' };
    fetch(`/api/grades/${id}`, deleteInit)
      .then(() => {
        const remainingState = this.state.grades.filter(index => index.id !== id);
        this.setState({ grades: remainingState });
      })
      .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <div>
        <div className="container">
          <Header average={this.getAverageGrade()} />
        </div>
        <div className="row">
          <div className="container col-lg-8 col-9">
            <GradeTable grades={this.state.grades} delete={this.deleteGrade}/>
          </div>
          <div className="container col-lg-3 col-9">
            <GradeForm newGrade={this.newGrade} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
