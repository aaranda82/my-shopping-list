import React from 'react';
import ItemTable from './itemTable';
import Header from './header';
import ItemForm from './itemForm';
import ListByStore from './listByStore';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToBuy: [],
      itemToUpdate: {},
      isMobilePortrait: true,
      inputFormFeedback: '',
      pendingConfirmDelete: false,
      communicatingWithServer: false,
      view: {
        name: 'shoppingList',
        store: ''
      }
    };
    this.newItem = this.newItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.itemToUpdate = this.itemToUpdate.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.screenSizeCheck = this.screenSizeCheck.bind(this);
    this.setView = this.setView.bind(this);
    this.confirmDeleteItem = this.confirmDeleteItem.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
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

  async createNewStore(newItem, op) {

    const postInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    };
    try {
      const response = await fetch('/api/items/new-store', postInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      if (op === 'new item') {
        const itemsToBuy = [...this.state.itemsToBuy, responseJSON];
        this.setState({
          itemsToBuy,
          inputFormFeedback: 'New Item Added',
          communicatingWithServer: false
        });
        this.handleFeedbackReset();
      } else if (op === 'update item') {
        const itemsToBuy = [...this.state.itemsToBuy];
        const indexOfUpdated = itemsToBuy.findIndex(index => index.itemid === responseJSON.itemid);
        itemsToBuy[indexOfUpdated] = responseJSON;
        this.setState({
          itemsToBuy,
          inputFormFeedback: 'Item Updated'
        });
        this.handleFeedbackReset();
      }

    } catch (error) {
      console.error(error);
      this.setState({
        inputFormFeedback: 'An Unexpected Error Occurred'
      });
      this.handleFeedbackReset();
    }
  }

  async newItem(newItem) {
    this.setState({ communicatingWithServer: true });
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
      if (responseJSON === 'no store') {
        const op = 'new item';
        const inputFormFeedback = (
          <>
            <div>This store is not in the database. Create New Store?</div>
            <button className='btn btn-primary' onClick={() => { this.createNewStore(newItem, op); }}>OK</button>
            <button className='btn btn-outline-dark' onClick={this.cancelDelete}>Cancel</button>
          </>
        );
        this.setState({
          inputFormFeedback,
          pendingConfirmDelete: true
        });
      } else {

        const itemsToBuy = [...this.state.itemsToBuy, responseJSON];
        this.setState({
          itemsToBuy,
          inputFormFeedback: 'New Item Added',
          communicatingWithServer: false
        });
        this.handleFeedbackReset();
      }
    } catch (error) {
      console.error(error);
      this.setState({
        inputFormFeedback: 'An Unexpected Error Occurred'
      });
      this.handleFeedbackReset();
    }
  }

  async deleteItem(id) {
    const deleteInit = { method: 'DELETE' };
    try {
      const response = await fetch(`/api/items/${id}`, deleteInit);
      const responseJSON = await response.json();
      const itemsToBuy = this.state.itemsToBuy.filter(index => index.itemid !== parseInt(responseJSON));
      this.setState({
        itemsToBuy,
        inputFormFeedback: 'Item Deleted'
      });
      this.handleFeedbackReset();
    } catch (error) {
      console.error(error);
      this.setState({
        inputFormFeedback: 'An Unexpected Error Occurred'
      });
      this.handleFeedbackReset();
    }
  }

  itemToUpdate(event) {
    const { name, title, value, id } = event.target;
    this.setState({
      itemToUpdate: {
        name,
        store: title,
        quantity: value,
        itemId: id
      }
    });
  }

  async updateItem(item) {
    const id = item.itemId;
    const updateInit = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    };
    try {
      const response = await fetch(`/api/items/${id}`, updateInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      if (responseJSON === 'no store') {
        const op = 'update item';
        const inputFormFeedback = (
          <>
            <div>This store is not in the database. Create New Store?</div>
            <button className='btn btn-primary' onClick={() => { this.createNewStore(item, op); }}>OK</button>
            <button className='btn btn-outline-dark' onClick={this.cancelDelete}>Cancel</button>
          </>
        );
        this.setState({
          inputFormFeedback,
          pendingConfirmDelete: true
        });
      } else {
        const itemsToBuy = [...this.state.itemsToBuy];
        const indexOfUpdated = itemsToBuy.findIndex(index => index.itemid === responseJSON.itemid);
        itemsToBuy[indexOfUpdated] = responseJSON;
        this.setState({
          itemsToBuy,
          inputFormFeedback: 'Item Updated'
        });
        this.handleFeedbackReset();
      }
    } catch (error) {
      console.error(error);
      this.setState({
        inputFormFeedback: 'An Unexpected Error Occurred'
      });
      this.handleFeedbackReset();
    }
  }

  setView(name, store) {
    const view = {
      name,
      store
    };
    this.setState({ view });
  }

  handleFeedbackReset() {
    setTimeout(() => {
      this.setState({
        inputFormFeedback: '',
        pendingConfirmDelete: false
      });
    }, 2000);
  }

  cancelDelete() {
    this.setState({
      inputFormFeedback: '',
      pendingConfirmDelete: false,
      communicatingWithServer: false
    });
  }

  confirmDeleteItem(event) {
    event.preventDefault();
    const { id } = event.target;
    const confirmCancelButton = (
      <>
        <div>Are You Sure?</div>
        <button className='btn btn-danger' onClick={() => { this.deleteItem(id); }}>Confirm Delete</button>
        <button className='btn btn-outline-dark' onClick={this.cancelDelete}>Cancel</button>
      </>
    );
    this.setState({
      inputFormFeedback: confirmCancelButton,
      pendingConfirmDelete: true
    });
  }

  handleRender() {
    let domView = null;
    const shoppingListView = (
      <>
        <Header />
        <div className="container">
          <div className="row">
            <div id="itemForm" className="col-12 col-md-6">
              <ItemForm newItem={this.newItem}
                itemToUpdate={this.state.itemToUpdate}
                updateItem={this.updateItem}
                communicatingWithServer={this.state.communicatingWithServer} />
            </div>
            <div id="CRUD-feedback" className={`col-12 col-md-6 text-center ${window.innerWidth < 700 ? 'h5' : 'display-4'} ${this.state.inputFormFeedback ? 'bg-warning' : null}`}>
              {this.state.inputFormFeedback}
            </div>
            <div id="itemTable" className="col-12">
              <ItemTable itemsToBuy={this.state.itemsToBuy}
                delete={this.confirmDeleteItem}
                itemToUpdateFx={this.itemToUpdate}
                itemToUpdate={this.state.itemToUpdate}
                isMobile={this.state.isMobilePortrait}
                setView={this.setView}
                updateItem={this.updateItem}
                pendingConfirmDelete={this.state.pendingConfirmDelete} />
            </div>
          </div>
        </div>
      </>
    );
    const storeView = (
      <>
        <Header />
        <div className="container">
          <div className="row">
            <ListByStore store={this.state.view.store} setView={this.setView} />
          </div>
        </div>
      </>
    );
    switch (this.state.view.name) {
      case 'shoppingList':
        domView = shoppingListView;
        break;
      case 'store':
        domView = storeView;
        break;
    }
    return domView;
  }

  render() {
    return this.handleRender();
  }
}

export default App;
