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
      addOrUpdate: 'ADD'
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
      addOrUpdate: 'ADD'
    });
  }

  studentChange(event) {
    const grade = { ...this.state.grade };
    grade.name = event.target.value;
    this.setState({ grade });
  }

  courseChange(event) {
    const grade = { ...this.state.grade };
    grade.course = event.target.value;
    this.setState({ grade });
  }

  gradeChange(event) {
    const grade = { ...this.state.grade };
    grade.grade = parseInt(event.target.value) ? parseInt(event.target.value) : 0;
    this.setState({ grade });
  }

  componentDidUpdate(prevProps) {
    const { name, course, grade, id } = this.props.gradeToUpdate;
    if (this.props.gradeToUpdate !== prevProps.gradeToUpdate) {
      this.setState({
        grade: {
          name: name,
          course: course,
          grade: grade,
          id: parseInt(id)
        },
        addOrUpdate: 'UPDATE'
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
            <input type="text" className="form-control" value={this.state.grade.name} onChange={this.studentChange} placeholder="Name" required />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fas fa-list-alt"></i></div>
            </div>
            <input type="text" className="form-control" value={this.state.grade.course} onChange={this.courseChange} placeholder="Course" required />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <div className="input-group-text"><i className="fas fa-graduation-cap"></i></div>
            </div>
            <input type="text" className="form-control" value={this.state.grade.grade} onChange={this.gradeChange} placeholder="Grade" required />
          </div>
          <button
            type="submit"
            className={this.state.addOrUpdate === 'ADD' ? 'btn btn-primary m-1' : 'btn btn-success m-1'}
            onClick={this.state.addOrUpdate === 'ADD' ? this.handleAdd : this.handleUpdate}>
            {this.state.addOrUpdate}
          </button>
          <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button>
        </form>
      </div>
    );
  }
}

export default GradeForm;
