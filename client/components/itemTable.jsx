import React from "react";
import Item from "./item";

function itemElements(props) {
  const { itemsToBuy } = props;
  if (!itemsToBuy.length) {
    return (
      <tbody>
        <tr>
          <th className="align-middle" scope="row">
            !
          </th>
          <td className="align-middle">Shopping List Empty</td>
          <td className="align-middle"></td>
          <td className="align-middle"></td>
          <td className="text-center"></td>
        </tr>
      </tbody>
    );
  } else {
    const tableItems = itemsToBuy.map((itemObj, index) => {
      return (
        <Item
          key={index}
          index={index + 1}
          item={itemObj}
          delete={props.delete}
          setView={props.setView}
          updateFeedback={props.updateFeedback}
          updateItem={props.updateItem}
          pendingConfirmDelete={props.pendingConfirmDelete}
          handleUpdateModal={props.handleUpdateModal}
        />
      );
    });
    return <tbody>{tableItems}</tbody>;
  }
}

function ItemTable(props) {
  const tableClass = "table table-striped";
  return (
    <table className={tableClass}>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Item</th>
          <th scope="col">Store</th>
          <th scope="col">Qty</th>
          <th scope="col" className="text-center">
            Operations
          </th>
        </tr>
      </thead>
      {itemElements(props)}
    </table>
  );
}

export default ItemTable;
