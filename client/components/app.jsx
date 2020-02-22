import React from 'react';
import ItemTable from './itemTable';
import Header from './header';
import ItemForm from './itemForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToBuy: [],
      itemToUpdate: {},
      isMobilePortrait: true
    };
    this.newItem = this.newItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.itemToUpdate = this.itemToUpdate.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.screenSizeCheck = this.screenSizeCheck.bind(this);
  }

  async componentDidMount() {
    window.addEventListener('resize', this.screenSizeCheck);
    try {
      const response = await fetch('/api/items');
      const itemsToBuy = await response.json();
      this.setState({ itemsToBuy });
    } catch (error) {
      console.error(error);
    }
    this.screenSizeCheck();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenSizeCheck);
  }

  screenSizeCheck() {
    this.setState({ isMobilePortrait: window.innerWidth < 450 });
  }

  async newItem(newItem) {
    const postInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    };
    try {
      const response = await fetch('/api/items', postInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      const itemsToBuy = [...this.state.itemsToBuy, responseJSON];
      this.setState({ itemsToBuy });
    } catch (error) {
      console.error(error);
    }
  }

  async deleteItem(event) {
    const id = parseInt(event.target.id);
    const deleteInit = { method: 'DELETE' };
    try {
      const response = await fetch(`/api/items/${id}`, deleteInit);
      const responseJSON = await response.json();
      const itemsToBuy = this.state.itemsToBuy.filter(index => index.itemid !== parseInt(responseJSON));
      this.setState({ itemsToBuy });
    } catch (error) {
      console.error(error);
    }
  }

  itemToUpdate(event) {
    const { name, title, value, id } = event.target;
    this.setState({
      itemToUpdate: {
        name,
        category: title,
        quantity: value,
        id
      }
    });
  }

  async updateItem(item) {
    const updateInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: item.category,
        item: item.item,
        quantity: item.quantity
      })
    };
    const id = parseInt(item.id);
    try {
      const response = await fetch(`/api/items/${id}`, updateInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      const itemsToBuy = [...this.state.itemsToBuy];
      const indexOfUpdated = itemsToBuy.findIndex(index => index.itemid === responseJSON.itemid);
      itemsToBuy[indexOfUpdated] = responseJSON;
      this.setState({ itemsToBuy });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <>
        <div id="gradeArea" className="container">
          <div className="row">
            <div id="header" className="col-12 col-sm-6 mt-3 col-lg-12">
              <Header />
            </div>
            <div id="gradeForm" className="col-9 col-sm-6 col-lg-4 ml-5 ml-sm-0 pt-5">
              <ItemForm newItem={this.newItem} itemToUpdate={this.state.itemToUpdate} updateItem={this.updateItem} />
            </div>
            <div id="gradeTable" className="col-12 col-lg-8 mt-5">
              <ItemTable itemsToBuy={this.state.itemsToBuy} delete={this.deleteItem} update={this.itemToUpdate} isMobile={this.state.isMobilePortrait} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
