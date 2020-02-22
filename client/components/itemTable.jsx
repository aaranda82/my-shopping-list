import React from 'react';
import Items from './item';

function itemElements(props) {
  const itemsToBuy = props.itemsToBuy;
  if (!itemsToBuy) {
    return (
      <tbody>
        <tr>
          <td colSpan="4">No Data Recorded</td>
        </tr>
      </tbody>
    );
  } else {
    const tabelItems = itemsToBuy.map((itemObj, index) => {
      return <Items key={index} index={index + 1} item={itemObj} update={props.update} delete={props.delete} />;
    });
    return (
      <tbody>
        {tabelItems}
      </tbody>
    );
  }
}

function ItemTable(props) {
  const tableClass = 'table table-striped';
  return (
    <table className={props.isMobile ? `${tableClass} table-sm` : tableClass}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Category</th>
          <th scope="col">Qty</th>
          <th scope="col" className="text-center">Operations</th>
        </tr>
      </thead>
      {itemElements(props)}
    </table>
  );
}

export default ItemTable;