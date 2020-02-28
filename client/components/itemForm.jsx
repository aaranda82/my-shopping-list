import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      item: {
        item: '',
        store: '',
        quantity: '',
        itemId: ''
      },
      addOrUpdate: 'ADD',
      itemError: '',
      storeError: '',
      quantityError: ''
    };
    this.itemChange = this.itemChange.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.validateStore = this.validateStore.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    const { itemError, storeError, quantityError } = this.state;
    const { item, store, quantity } = this.state.item;
    if (!item && !store && !quantity) {
      this.setState({
        itemError: 'Please Add Item',
        storeError: 'Please Add Store',
        quantityError: 'Please Add Quantity'
      });
    } else if (!item) {
      this.setState({ itemError: 'Please Add Item' });
    } else if (!store) {
      this.setState({ storeError: 'Please Add Store' });
    } else if (!quantity) {
      this.setState({ quantityError: 'Please Add Quantity' });
    } else if (!itemError || !storeError || !quantityError) {
      this.setState({ isLoading: true });
      this.props.newItem(this.state.item);
      this.handleCancel();
    }
  }

  handleItemUpdate(event) {
    event.preventDefault();
    this.props.updateItem(this.state.item);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      item: {
        item: '',
        store: '',
        quantity: '',
        itemId: ''
      },
      addOrUpdate: 'ADD',
      itemError: '',
      storeError: '',
      quantityError: ''
    });
  }

  itemChange(event) {
    if (event.target.value.length > 65) {
      return false;
    } else {
      const item = { ...this.state.item };
      item.item = event.target.value;
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

  handleAddButtonClass() {
    const { item, store, quantity } = this.state.item;
    if (this.state.addOrUpdate === 'ADD') {
      if (item && store && quantity) {
        return 'btn-primary';
      } else {
        return 'btn-secondary';
      }
    } else {
      return 'btn-success';
    }
  }

  handleAddButtonText() {
    const className = this.handleAddButtonClass();
    switch (className) {
      case 'btn-primary':
        return 'ADD';
        break;
      case 'btn-secondary':
        return 'ENTER ITEM INFO';
        break;
      case 'btn-success':
        return 'UPDATE';
        break;
    }
  }

  componentDidUpdate(prevProps) {
    const { name, store, quantity, itemId } = this.props.itemToUpdate;
    if (this.props.itemToUpdate !== prevProps.itemToUpdate) {
      this.setState({
        item: {
          item: name,
          store,
          quantity,
          itemId: parseInt(itemId)
        },
        addOrUpdate: 'UPDATE'
      });
    }
  }

  handleenableInputs() {
    const communicating = !!this.props.communicatingWithServer;
    return communicating;
  }

  render() {
    return (
      <form className='needs-validation' noValidate>
        <div className="form-group">
          <label htmlFor="Item" className="mt-3">I need:</label>
          <input type="text" className="form-control" value={this.state.item.item} onChange={this.itemChange} onBlur={this.validateItem} disabled={this.handleenableInputs()} />
          <div className="text-danger">{this.state.itemError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Store">From:</label>
          <input type="text" className="form-control" value={this.state.item.store} onChange={this.storeChange} onBlur={this.validateStore} disabled={this.handleenableInputs()} />
          <div className="text-danger">{this.state.storeError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Item">Quantity:</label>
          <input type="number" className="form-control" value={this.state.item.quantity} onChange={this.quantityChange} onBlur={this.validateQuantity} disabled={this.handleenableInputs()} />
          <div className="text-danger">{this.state.quantityError}</div>
        </div>
        <button
          type="submit"
          className={`btn m-1 ${this.handleAddButtonClass()}`}
          onClick={this.state.addOrUpdate === 'ADD' ? this.handleAdd : this.handleItemUpdate} >
          {this.handleAddButtonText()}
        </button>
        <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button>
      </form>
    );
  }
}

export default ItemForm;
