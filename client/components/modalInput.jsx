import React from 'react';

class ModalInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToUpdate: {
        item: '',
        store: '',
        quantity: '',
        itemId: ''
      }
    };
    this.itemChange = this.itemChange.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.validateStore = this.validateStore.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
  }

  componentDidMount() {
    const { itemToUpdate } = this.props;
    this.setState({ itemToUpdate });
  }

  itemChange(event) {
    const { value } = event.target;
    if (value.length > 65) {
      return false;
    } else {
      const itemToUpdate = { ...this.state.itemToUpdate };
      itemToUpdate.item = value;
      this.setState({
        itemToUpdate,
        itemError: ''
      });
    }
  }

  storeChange(event) {
    const { value } = event.target;
    if (value.length > 25) {
      return false;
    } else {
      const itemToUpdate = { ...this.state.itemToUpdate };
      itemToUpdate.store = value;
      this.setState({
        itemToUpdate,
        storeError: ''
      });
    }
  }

  quantityChange(event) {
    const { value } = event.target;
    if (value >= 0 && value <= 100) {
      const itemToUpdate = { ...this.state.itemToUpdate };
      itemToUpdate.quantity = value;
      this.setState({
        itemToUpdate,
        quantityError: ''
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

  validateStore(event) {
    event.preventDefault();
    const store = event.target.value;
    let storeError = '';
    if (!store) {
      storeError = 'Please Enter Store';
    }
    this.setState({ storeError });
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

  handleItemUpdate(event) {
    event.preventDefault();
    this.props.updateItem(this.state.itemToUpdate);
    this.handleCancel();
  }

  handleCancel() {
    const itemToUpdate = {
      item: '',
      store: '',
      quantity: '',
      itemId: ''
    };
    this.setState({
      itemToUpdate,
      itemError: '',
      storeError: '',
      quantityError: ''
    });
    this.props.cancelOperation();
  }

  render() {
    return (
      <form className='needs-validation' noValidate>
        <div className="form-group">
          <label htmlFor="Item" className="mt-3">I need:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.itemToUpdate.item}
            onChange={this.itemChange}
            onBlur={this.validateItem} />
          <div className="text-danger">{this.state.itemError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Store">From:</label>
          <input
            type="text"
            className="form-control"
            value={this.state.itemToUpdate.store}
            onChange={this.storeChange}
            onBlur={this.validateStore} />
          <div className="text-danger">{this.state.storeError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Item">Quantity:</label>
          <input type="number" className="form-control" value={this.state.itemToUpdate.quantity} onChange={this.quantityChange} onBlur={this.validateQuantity} />
          <div className="text-danger">{this.state.quantityError}</div>
        </div>
        <button type="submit" className="btn btn-success" onClick={this.handleItemUpdate} > Update </button>
        <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button>
      </form>
    );
  }
}

export default ModalInput;
