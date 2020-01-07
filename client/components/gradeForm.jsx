import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.studentChange = this.studentChange.bind(this);
    this.courseChange = this.courseChange.bind(this);
    this.gradeChange = this.gradeChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleAdd() {
    this.props.newGrade(this.state);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  studentChange(event) {
    this.setState({ name: event.target.value });
  }

  courseChange(event) {
    this.setState({ course: event.target.value });
  }

  gradeChange(event) {
    this.setState({ grade: parseInt(event.target.value) });
  }

  render() {
    return (
      <div>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text fas fa-user"></span>
            </div>
            <input type="text" className="form-control" value={this.state.name} onChange={this.studentChange} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text far fa-list-alt"></span>
            </div>
            <input type="text" className="form-control" value={this.state.course} onChange={this.courseChange}/>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text fas fa-graduation-cap"></span>
            </div>
            <input type="text" className="form-control" value={this.state.grade} onChange={this.gradeChange}/>
          </div>
        </form>
        <button type="button" className="btn btn-primary m-1" onClick={this.handleAdd}>ADD</button>
        <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button>
      </div>
    );
  }
}

export default GradeForm;
