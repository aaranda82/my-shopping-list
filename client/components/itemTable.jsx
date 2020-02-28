import React from 'react';
import Item from './item';

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
    const tableItems = itemsToBuy.map((itemObj, index) => {
      return <Item key={index}
        index={index + 1}
        item={itemObj}
        itemToUpdateFx={props.itemToUpdateFx}
        delete={props.delete}
        setView={props.setView}
        updateFeedback={props.updateFeedback}
        updateItem={props.updateItem}
        isMobile={props.isMobile}
        pendingConfirm={props.pendingConfirm} />;
    });
    return (
      <tbody>
        {tableItems}
      </tbody>
    );
  }
}

function ItemTable(props) {
  const tableClass = 'table table-striped';
  return (
    <table className={props.isMobile ? `${tableClass} table-sm table-responsive` : tableClass}>
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
