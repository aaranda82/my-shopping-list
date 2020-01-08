import React from 'react';

function grades(props) {
  const grade = props.grade;
  return (
    <tr>
      <th scope="row">{grade.id}</th>
      <td>{grade.name}</td>
      <td>{grade.course}</td>
      <td>{grade.grade}</td>
      <td className="text-center">
        <button type="button" className="btn btn-danger m-1" id={grade.id} onClick={props.delete}>Delete</button>
        <button type="button" className="btn btn-success m-1" name={grade.name} value={grade.grade}
          title={grade.course} id={grade.id} onClick={props.update}>Update</button>
      </td>
    </tr>
  );
}

export default grades;
