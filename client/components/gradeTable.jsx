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
          <th scope="col">Operations</th>
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
      return <Grades key={gradeObject.id} grade={gradeObject} delete={props.delete}/>;
    });
    return (
      <tbody>
        {tabelItems}
      </tbody>
    );
  }
}

export default gradeTable;
