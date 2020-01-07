import React from 'react';
import GradeTable from './gradeTable';
import Header from './header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(response => {
        return response.json();
      })
      .then(parsedResponse => {
        this.setState({ grades: parsedResponse });
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

  render() {
    return (
      <div>
        <div className="container">
          <Header average={this.getAverageGrade()} />
        </div>
        <div className="container">
          <GradeTable grades={this.state.grades} />
        </div>
      </div>
    );
  }
}

export default App;
