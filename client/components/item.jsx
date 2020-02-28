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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.validateStore = this.validateStore.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
  }

  handleUpdate(event) {
    event.preventDefault();
    this.setState({
      itemIsBeingUpdated: true
    });
  }

  handleItemRender() {
    if (!this.state.itemIsBeingUpdated) {
      return this.state.item.item;
    } else {
      return (
        <>
          <input type="text" className="input-sm" value={this.state.item.item} onChange={this.itemChange} onBlur={this.validateItem} />
          <div className="text-danger">{this.state.itemError}</div>
        </>
      );
    }
  }

  itemChange(event) {
    if (event.target.value.length > 65) {
      return false;
    } else {
      const item = { ...this.state.item };
      item.item = event.target.value;
      item.item.quantity = parseInt(item.item.quantity);
      this.setState({
        item,
        itemError: ''
      });
    }
  }

  validateItem(event) {
    event.preventDefault();
    const item = event.target.value;
    let itemError = '';
    if (!item) {
      itemError = 'Please Enter Item';
    }
    this.setState({ itemError });
  }

  handleStoreRender() {
    if (!this.state.itemIsBeingUpdated) {
      return this.state.item.store;
    } else {
      return (
        <>
          <input type="text" value={this.state.item.store} onChange={this.storeChange} onBlur={this.validateStore} />
          <div className="text-danger">{this.state.storeError}</div>
        </>
      );
    }
  }

  storeChange(event) {
    if (event.target.value.length > 25) {
      return false;
    } else {
      const item = { ...this.state.item };
      item.store = event.target.value;
      this.setState({
        item,
        storeError: ''
      });
    }
  }

  validateStore(event) {
    event.preventDefault();
    const store = event.target.value;
    let storeError = '';
    if (!store) {
      storeError = 'Please Enter Store';
    }
    this.setState({ storeError });
  }

  handleStoreOnClick() {
    if (!this.state.itemIsBeingUpdated) {
      return () => this.props.setView('store', this.props.item.store);
    } else {
      return null;
    }
  }

  handleQuantityRender() {
    if (!this.state.itemIsBeingUpdated) {
      return this.state.item.quantity;
    } else {
      return (
        <>
          <input type="number" value={this.state.item.quantity} onChange={this.quantityChange} onBlur={this.validateQuantity} />
          <div className="text-danger">{this.state.quantityError}</div>
        </>
      );
    }
  }

  quantityChange(event) {
    if (event.target.value >= 0 && event.target.value <= 100) {
      const item = { ...this.state.item };
      item.quantity = event.target.value;
      this.setState({
        item,
        quantityError: ''
      });
    }
  }

  validateQuantity(event) {
    event.preventDefault();
    const quantity = event.target.value;
    let quantityError = '';
    if (!quantity) {
      quantityError = 'Please Enter Quantity';
    }
    this.setState({ quantityError });
  }

  handleCancel() {
    this.setState({
      itemIsBeingUpdated: false
    });
  }

  handleItemUpdate(event) {
    event.preventDefault();
    this.props.updateItem(this.state.item);
    this.handleCancel();
  }

  handleUpdateButtonOnClick() {
    if (this.props.isMobile) {
      return this.props.itemToUpdateFx;
    } else {
      const onClick = this.state.itemIsBeingUpdated ? this.handleItemUpdate : this.handleUpdate;
      return onClick;
    }
  }

  handleButtonEnable() {
    if (this.props.pendingConfirm) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <tr>
        <th className="align-middle" scope="row">{this.props.index}</th>
        <td className="align-middle">{this.handleItemRender()}</td>
        <td className="align-middle cursor-pointer" onClick={this.handleStoreOnClick()} >{this.handleStoreRender()}</td>
        <td className="align-middle">{this.handleQuantityRender()}</td>
        <td className="text-center">
          <button type="button" className="btn btn-danger m-1" id={this.props.item.itemid} onClick={this.props.delete} disabled={this.handleButtonEnable()}>Delete</button>
          <button type="button"
            className="btn btn-success m-1"
            name={this.props.item.item}
            value={this.props.item.quantity}
            title={this.props.item.store}
            id={this.props.item.itemid}
            onClick={this.handleUpdateButtonOnClick()} disabled={this.handleButtonEnable()}>Update</button>
          {this.state.itemIsBeingUpdated ? <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button> : null}
        </td>
      </tr>
    );
  }
}

export default Items;
