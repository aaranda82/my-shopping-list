import React from 'react';

function populateGrades(props) {
  const tableData = props.map(index => {
    return (
      <tr key={index.id}>
        <th scope="row">{index.id}</th>
        <td>{index.name}</td>
        <td>{index.course}</td>
        <td>{index.grade}</td>
      </tr>
    );
  });
  return tableData;
}

export default populateGrades;
