import React from 'react';
import Grades from './grade';

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
      {gradeElements(props)}
    </table>
  );
}

function gradeElements(props) {
  if (props.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan="4">No Data Recorded</td>
        </tr>
      </tbody>
    );
  } else {
    const tabelItems = props.grades.map(gradeObject => {
      return <Grades key={gradeObject.id} grade={gradeObject} />;
    });
    return (
      <tbody>
        {tabelItems}
      </tbody>
    );
  }
}

export default gradeTable;
