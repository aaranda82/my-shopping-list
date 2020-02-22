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
      addOrUpdate: 'ADD'
    };
    this.studentChange = this.studentChange.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleAdd() {
    const { item, category, quantity } = this.state.item;
    if (item && category && quantity) {
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

  studentChange(event) {
    const item = { ...this.state.item };
    item.item = event.target.value;
    this.setState({ item });
  }

  categoryChange(event) {
    const item = { ...this.state.item };
    item.category = event.target.value;
    this.setState({ item });
  }

  quantityChange(event) {
    if (event.target.value >= 0 && event.target.value <= 100) {
      const item = { ...this.state.item };
      item.quantity = event.target.value;
      this.setState({ item });
    }
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
      <form>
        <div className="form-group">
          <label htmlFor="Item">Item</label>
          <input type="text" className="form-control" value={this.state.item.item} onChange={this.studentChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Category">Category</label>
          <input type="text" className="form-control" value={this.state.item.category} onChange={this.categoryChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="Item">Quantity</label>
          <input type="number" className="form-control" value={this.state.item.quantity} onChange={this.quantityChange} required />
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
