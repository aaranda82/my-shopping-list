import React from 'react';

function grades(props) {
  const grade = props.grade;
  return (
    <tr>
      <th className="align-middle" scope="row">{grade.id}</th>
      <td className="align-middle">{grade.name}</td>
      <td className="align-middle">{grade.course}</td>
      <td className="align-middle">{grade.grade}</td>
      <td className="text-center">
        <button type="button" className="btn btn-danger m-1" id={grade.id} onClick={props.delete}>Delete</button>
        <button type="button" className="btn btn-success m-1" name={grade.name} value={grade.grade}
          title={grade.course} id={grade.id} onClick={props.update}>Update</button>
      </td>
    </tr>
  );
}

export default grades;
