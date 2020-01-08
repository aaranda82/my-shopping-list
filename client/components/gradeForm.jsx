import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      grade: {
        name: '',
        course: '',
        grade: ''
      },
      addOrUpdateButton: 'btn btn-primary m-1',
      addOrUpdate: 'ADD',
      handleAddOrUpdate: this.handleAdd
    };
    this.studentChange = this.studentChange.bind(this);
    this.courseChange = this.courseChange.bind(this);
    this.gradeChange = this.gradeChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleAdd() {
    this.props.newGrade(this.state.grade);
    this.handleCancel();
  }

  handleUpdate() {
    this.props.updateGrade(this.state.grade);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      grade: {
        name: '',
        course: '',
        grade: ''
      },
      addOrUpdateButton: 'btn btn-primary m-1',
      addOrUpdate: 'ADD',
      handleAddOrUpdate: this.handleAdd
    });
  }

  studentChange(event) {
    const currentStateCopy = { ...this.state.grade };
    currentStateCopy.name = event.target.value;
    this.setState({ grade: currentStateCopy });
  }

  courseChange(event) {
    const currentStateCopy = { ...this.state.grade };
    currentStateCopy.course = event.target.value;
    this.setState({ grade: currentStateCopy });
  }

  gradeChange(event) {
    const currentStateCopy = { ...this.state.grade };
    currentStateCopy.grade = parseInt(event.target.value);
    this.setState({ grade: currentStateCopy });
  }

  componentDidUpdate(prevProps) {
    if (this.props.gradeToUpdate !== prevProps.gradeToUpdate) {
      this.setState({
        grade: {
          name: this.props.gradeToUpdate.name,
          course: this.props.gradeToUpdate.course,
          grade: this.props.gradeToUpdate.grade,
          id: parseInt(this.props.gradeToUpdate.id)
        },
        addOrUpdateButton: 'btn btn-success m-1',
        addOrUpdate: 'UPDATE',
        handleAddOrUpdate: this.handleUpdate
      });
    }
  }

  render() {
    return (
      <div>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fas fa-user"></i></div>
            </div>
            <input type="text" className="form-control" value={this.state.grade.name} onChange={this.studentChange} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fas fa-list-alt"></i></div>
            </div>
            <input type="text" className="form-control" value={this.state.grade.course} onChange={this.courseChange} />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fas fa-graduation-cap"></i></div>
            </div>
            <input type="text" className="form-control" value={this.state.grade.grade} onChange={this.gradeChange} />
          </div>
        </form>
        <button type="button" className={this.state.addOrUpdateButton} onClick={this.state.handleAddOrUpdate}>{this.state.addOrUpdate}</button>
        <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button>
      </div>
    );
  }
}

export default GradeForm;
