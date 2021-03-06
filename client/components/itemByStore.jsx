import React from 'react';

function ItemByStore(props) {
  return (
    <tr>
      <th className="align-middle" scope="row">{props.index}</th>
      <td className="align-middle">{props.item.item}</td>
      <td className="align-middle">{props.item.quantity}</td>
    </tr>
  );
}

export default ItemByStore;
