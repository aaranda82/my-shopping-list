import React from 'react';
import Grades from './grade';

function gradeElements(props) {
  const grades = props.grades;
  if (!grades) {
    return (
      <tbody>
        <tr>
          <td colSpan="4">No Data Recorded</td>
        </tr>
      </tbody>
    );
  } else {
    const tabelItems = grades.map((gradeObject, index) => {
      return <Grades key={index} index={index + 1} grade={gradeObject} update={props.update} delete={props.delete} />;
    });
    return (
      <tbody>
        {tabelItems}
      </tbody>
    );
  }
}

function gradeTable(props) {
  const tableClass = 'table table-striped';
  return (
    <table className={props.isMobile ? `${tableClass} table-sm` : tableClass}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Course</th>
          <th scope="col">Grade</th>
          <th scope="col" className="text-center">Operations</th>
        </tr>
      </thead>
      {gradeElements(props)}
    </table>
  );
}

export default gradeTable;
