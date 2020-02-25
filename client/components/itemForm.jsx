import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      item: {
        item: '',
        category: '',
        quantity: ''
      },
      addOrUpdate: 'ADD',
      itemError: '',
      categoryError: '',
      quantityError: ''
    };
    this.itemChange = this.itemChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.validateCategory = this.validateCategory.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    const { itemError, categoryError, quantityError } = this.state;
    if (!itemError || !categoryError || !quantityError) {
      this.props.newItem(this.state.item);
      this.handleCancel();
    }
  }

  handleUpdate() {
    this.props.updateItem(this.state.item);
    this.handleCancel();
  }

  handleCancel() {
    this.setState({
      item: {
        item: '',
        category: '',
        quantity: ''
      },
      addOrUpdate: 'ADD'
    });
  }

  itemChange(event) {
    if (event.target.value.length > 65) {
      return false;
    } else {
      const item = { ...this.state.item };
      item.item = event.target.value;
      this.setState({ item });
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

  categoryChange(event) {
    if (event.target.value.length > 25) {
      return false;
    } else {
      const item = { ...this.state.item };
      item.category = event.target.value;
      this.setState({ item });
    }
  }

  validateCategory(event) {
    event.preventDefault();
    const category = event.target.value;
    let categoryError = '';
    if (!category) {
      categoryError = 'Please Enter Item';
    }
    this.setState({ categoryError });
  }

  quantityChange(event) {
    if (event.target.value >= 0 && event.target.value <= 100) {
      const item = { ...this.state.item };
      item.quantity = event.target.value;
      this.setState({ item });
    }
  }

  validateQuantity(event) {
    event.preventDefault();
    const quantity = event.target.value;
    let quantityError = '';
    if (!quantity) {
      quantityError = 'Please Enter Item';
    }
    this.setState({ quantityError });
  }

  componentDidUpdate(prevProps) {
    const { name, category, quantity, id } = this.props.itemToUpdate;
    if (this.props.itemToUpdate !== prevProps.itemToUpdate) {
      this.setState({
        item: {
          item: name,
          category,
          quantity,
          id: parseInt(id)
        },
        addOrUpdate: 'UPDATE'
      });
    }
  }

  render() {
    return (
      <form className="needs-validation" noValidate>
        <div className="form-group">
          <label htmlFor="Item">Item</label>
          <input type="text" className="form-control" value={this.state.item.item} onChange={this.itemChange} onBlur={this.validateItem} required />
          <div className="text-danger">{this.state.itemError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Category">Category</label>
          <input type="text" className="form-control" value={this.state.item.category} onChange={this.categoryChange} onBlur={this.validateCategory} required />
          <div className="text-danger">{this.state.categoryError}</div>
        </div>
        <div className="form-group">
          <label htmlFor="Item">Quantity</label>
          <input type="number" className="form-control" value={this.state.item.quantity} onChange={this.quantityChange} onBlur={this.validateQuantity} required />
          <div className="text-danger">{this.state.quantityError}</div>
        </div>
        <button
          type="submit"
          className={this.state.addOrUpdate === 'ADD' ? 'btn btn-primary m-1' : 'btn btn-success m-1'}
          onClick={this.state.addOrUpdate === 'ADD' ? this.handleAdd : this.handleUpdate}>
          {this.state.addOrUpdate}
        </button>
        <button type="button" className="btn btn-outline-dark m-1" onClick={this.handleCancel}>CANCEL</button>
      </form>
    );
  }
}

export default ItemForm;
