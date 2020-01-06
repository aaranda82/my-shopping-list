import React from 'react';
import gradeTable from './gradeTable';
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

  render() {
    return (
      <div>
        <Header />
        {gradeTable(this.state.grades)}
      </div>
    );
  }
}

export default App;
