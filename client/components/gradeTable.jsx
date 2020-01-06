import React from 'react';
import populateGrades from './grade';

function gradeTable(props) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Course</th>
          <th scope="col">Grade</th>
        </tr>
      </thead>
      {checkForGrades(props)}
    </table>
  );
}

function checkForGrades(props) {
  if (props.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="4">No Data Recorded</td>
        </tr>
      </tbody>
    );
  } else {
    return (
      <tbody>
        {populateGrades(props)}
      </tbody>
    );
  }
}

export default gradeTable;
