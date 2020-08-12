import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../../server/public/ColorScheme';

const { lightRed, lightGreen, grey } = ColorScheme;
const Input = styled.input`
  border: solid 1px ${props => props.color};
`;

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        item: '',
        store: '',
        quantity: '',
        itemId: ''
      },
      addOrUpdate: 'ADD',
      itemError: null,
      storeError: null,
      quantityError: null
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.itemChange = this.itemChange.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.validateStore = this.validateStore.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    // eslint-disable-next-line no-console
    console.log('click');
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
    }
  }

  handleCancel() {
    this.setState({
      item: {
        item: '',
        store: '',
        quantity: '',
        itemId: ''
      },
      itemError: null,
      storeError: null,
      quantityError: null
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

  itemInputColor() {
    switch (this.state.itemError) {
      case 'Please Enter Item':
        return lightRed;
        break;
      case '':
        return lightGreen;
        break;
      case null:
        return grey;
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

  storeInputColor() {
    switch (this.state.storeError) {
      case 'Please Enter Store':
        return lightRed;
        break;
      case '':
        return lightGreen;
        break;
      case null:
        return grey;
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

  quantityInputColor() {
    switch (this.state.quantityError) {
      case 'Please Enter Quantity':
        return lightRed;
        break;
      case '':
        return lightGreen;
        break;
      case null:
        return grey;
    }
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

  handleEnableInputs() {
    const communicating = !!this.props.communicatingWithServer;
    return communicating;
  }

  renderStores() {
    const storeList = [];
    this.props.itemsToBuy.forEach(element => {
      const { store } = element;
      if (!storeList.includes(store)) {
        storeList.push(store);
      }
    });
    storeList.sort();
    const storeElements = storeList.map((item, index) => {
      return <option key={index}>{item}</option>;
    });
    return storeElements;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.communicatingWithServer !== prevProps.communicatingWithServer
    ) {
      this.handleCancel();
    }
  }

  render() {
    return (
      <form className="needs-validation" noValidate>
        <div className="form-group">
          <label htmlFor="Item" className="mt-3">
            I need:
          </label>
          <Input
            color={this.itemInputColor()}
            type="text"
            className="form-control"
            value={this.state.item.item}
            onChange={this.itemChange}
            onBlur={this.validateItem}
            disabled={this.handleEnableInputs()}
            placeholder="add item"
          />
          <div className="text-danger">{this.state.itemError}</div>
        </div>

        <div className="form-group">
          <label htmlFor="Store">From:</label>
          <Input
            color={this.storeInputColor()}
            type="text"
            list="store"
            className="form-control"
            value={this.state.item.store}
            onChange={this.storeChange}
            onBlur={this.validateStore}
            disabled={this.handleEnableInputs()}
            placeholder="add store"
          />
          <datalist id="store">{this.renderStores()}</datalist>
          <div className="text-danger">{this.state.storeError}</div>
        </div>

        <div className="form-group">
          <label htmlFor="Item">Quantity:</label>
          <Input
            color={this.quantityInputColor()}
            type="number"
            className="form-control"
            value={this.state.item.quantity}
            onChange={this.quantityChange}
            onBlur={this.validateQuantity}
            disabled={this.handleEnableInputs()}
            placeholder="add quantity"
          />
          <div className="text-danger">{this.state.quantityError}</div>
        </div>
        <button
          type="submit"
          className={`btn m-1 ${this.handleAddButtonClass()}`}
          onClick={this.handleAdd}
        >
          {this.handleAddButtonText()}
        </button>
        <button
          type="button"
          className="btn btn-dark m-1"
          onClick={this.handleCancel}
        >
          CANCEL
        </button>
      </form>
    );
  }
}

export default ItemForm;
