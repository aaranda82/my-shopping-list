import React from 'react';

function grades(props) {
  return (
    <tr>
      <th scope="row">{props.grade.id}</th>
      <td>{props.grade.name}</td>
      <td>{props.grade.course}</td>
      <td>{props.grade.grade}</td>
      <td>
        <button type="button" className="btn btn-danger" id={props.grade.id} onClick={props.delete}>Delete</button>
      </td>
    </tr>
  );
}

export default grades;
