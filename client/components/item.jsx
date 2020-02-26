import React from 'react';

function Items(props) {
  const item = props.item;
  return (
    <tr>
      <th className="align-middle" scope="row">{props.index}</th>
      <td className="align-middle">{item.item}</td>
      <td className="align-middle cursor-pointer" onClick={() => props.setView('category', item.category)} >{item.category}</td>
      <td className="align-middle">{item.quantity}</td>
      <td className="text-center">
        <button type="button" className="btn btn-danger m-1" id={item.itemid} onClick={props.delete}>Delete</button>
        <button type="button"
          className="btn btn-success m-1"
          name={item.item}
          value={item.quantity}
          title={item.category}
          id={item.itemid}
          onClick={props.update}>Update</button>
      </td>
    </tr>
  );
}

export default Items;
