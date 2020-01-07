import React from 'react';

function grades(props) {
  return (
    <tr>
      <th scope="row">{props.grade.id}</th>
      <td>{props.grade.name}</td>
      <td>{props.grade.course}</td>
      <td>{props.grade.grade}</td>
    </tr>
  );
}

export default grades;
