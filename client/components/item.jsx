import React from 'react';

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        item: this.props.item.item,
        store: this.props.item.store,
        quantity: this.props.item.quantity,
        itemId: this.props.item.itemid
      },
      itemIsBeingUpdated: false,
      itemError: '',
      storeError: '',
      quantityError: ''
    };

  }

  handleStoreOnClick() {
    if (!this.state.itemIsBeingUpdated) {
      return () => this.props.setView('store', this.props.item.store);
    } else {
      return null;
    }
  }

  render() {
    return (
      <tr>
        <th className="align-middle" scope="row">{this.props.index}</th>
        <td className="align-middle">{this.props.item.item}</td>
        <td className="align-middle cursor-pointer storeBtn" onClick={this.handleStoreOnClick()} >{this.props.item.store}</td>
        <td className="align-middle">{this.props.item.quantity}</td>
        <td className="text-center">
          <button type="button" className="btn btn-danger m-1" id={this.props.item.itemid} onClick={this.props.delete}>Delete</button>
          <button type="button"
            className="btn btn-success m-1"
            name={this.props.item.item}
            value={this.props.item.quantity}
            title={this.props.item.store}
            id={this.props.item.itemid}
            onClick={this.props.handleUpdateModal} >
            Update
          </button>
        </td>
      </tr>
    );
  }
}

export default Items;
