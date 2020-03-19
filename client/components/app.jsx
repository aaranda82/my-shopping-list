import React from 'react';
import ItemTable from './itemTable';
import Header from './header';
import ItemForm from './itemForm';
import ListByStore from './listByStore';
import Modal from './modal';
import ModalInput from './modalInput';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToBuy: [],
      // isMobilePortrait: true,
      pendingConfirmDelete: false,
      communicatingWithServer: false,
      modal: {
        showing: false,
        content: '',
        primaryButton: '',
        title: ''
      },
      view: {
        name: 'shoppingList',
        store: ''
      }
    };
    this.newItem = this.newItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.screenSizeCheck = this.screenSizeCheck.bind(this);
    this.setView = this.setView.bind(this);
    this.confirmDeleteItem = this.confirmDeleteItem.bind(this);
    this.cancelOperation = this.cancelOperation.bind(this);
    this.handleUpdateModal = this.handleUpdateModal.bind(this);
  }

  handleCatchError() {
    const modal = {
      showing: true,
      content: 'An Unexpected Error Occurred',
      title: 'Error',
      primaryButton: <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelOperation}>Close</button>
    };
    this.setState({ modal });

  }

  async componentDidMount() {
    window.addEventListener('resize', this.screenSizeCheck);
    try {
      const response = await fetch('/api/items');
      const itemsToBuy = await response.json();
      this.setState({ itemsToBuy });
    } catch (error) {
      console.error(error);
      this.handleCatchError();
    }
    this.screenSizeCheck();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.screenSizeCheck);
  }

  screenSizeCheck() {
    this.setState({ isMobilePortrait: (window.innerWidth > 500 && window.innerWidth < 680) });
  }

  async createNewStore(newItem) {
    this.setState({ communicatingWithServer: true });
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
      const itemsToBuy = [...this.state.itemsToBuy, responseJSON];
      const modal = { ...this.state.modal };
      modal.showing = true;
      modal.content = 'Item Added';
      modal.title = 'New Item';
      modal.primaryButton = null;
      this.setState({
        modal,
        itemsToBuy,
        communicatingWithServer: false
      });
      this.handleFeedbackReset();
    } catch (error) {
      console.error(error);
      this.handleCatchError();
    }
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
      if (responseJSON === 'no store') {
        const modal = {
          showing: true,
          content: `"${newItem.store}" is not in the database. Create New Store?`,
          primaryButton: (
            <>
              <button className='btn btn-primary' onClick={() => { this.createNewStore(newItem); }}>OK</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelOperation}>Close</button>
            </>
          )
        };
        this.setState({
          modal
        });
      } else {
        this.setState({ communicatingWithServer: true });
        const itemsToBuy = [...this.state.itemsToBuy, responseJSON];
        const modal = { ...this.state.modal };
        modal.showing = true;
        modal.content = 'Item Added';
        modal.title = 'New Item';
        this.setState({
          itemsToBuy,
          modal
        });
        this.handleFeedbackReset();
      }
    } catch (error) {
      console.error(error);
      this.handleCatchError();
      this.handleFeedbackReset();
    }
  }

  async deleteItem(id) {
    const deleteInit = { method: 'DELETE' };
    try {
      const response = await fetch(`/api/items/${id}`, deleteInit);
      const responseJSON = await response.json();
      const itemsToBuy = this.state.itemsToBuy.filter(index => index.itemid !== parseInt(responseJSON));
      const modal = { ...this.state.modal };
      modal.content = 'Item Deleted';
      modal.primaryButton = '';
      this.setState({
        modal,
        itemsToBuy
      });
      this.handleFeedbackReset();
    } catch (error) {
      console.error(error);
      this.handleCatchError();
    }
  }

  confirmDeleteItem(event) {
    const { id } = event.target;
    const modal = {
      showing: true,
      content: 'Are You Sure?',
      title: 'Confirm Delete',
      primaryButton: (
        <>
          <button className='btn btn-danger' onClick={() => { this.deleteItem(id); }}>Confirm Delete</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancelOperation}>Close</button>
        </>
      )
    };
    this.setState({
      modal
    });
  }

  async updateItemWithNewStore(newItem) {
    const postInit = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    };
    try {
      const response = await fetch('/api/items/update-new-store', postInit);
      const responseJSON = await response.json();
      if (!response.ok) {
        throw response;
      }
      const itemsToBuy = [...this.state.itemsToBuy];
      const indexOfUpdated = itemsToBuy.findIndex(index => index.itemid === parseInt(newItem.itemId));
      itemsToBuy[indexOfUpdated] = responseJSON;
      const modal = {
        showing: false,
        content: '',
        primaryButton: '',
        title: ''
      };
      this.setState({
        modal,
        itemsToBuy
      });
      this.handleFeedbackReset();
    } catch (error) {
      console.error(error);
      this.handleCatchError();
    }
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
        const modal = { ...this.state.modal };
        modal.showing = true;
        modal.title = 'New Store';
        modal.content = 'This store is not in the database. Create New Store?';
        modal.primaryButton = (
          <>
            <button className='btn btn-primary' onClick={() => { this.updateItemWithNewStore(item); }}>OK</button>
            <button className='btn btn-outline-dark' onClick={this.cancelOperation}>Cancel</button>
          </>
        );
        this.setState({
          modal,
          pendingConfirmDelete: true
        });
      } else {
        const itemsToBuy = [...this.state.itemsToBuy];
        const indexOfUpdated = itemsToBuy.findIndex(index => index.itemid === responseJSON.itemid);
        itemsToBuy[indexOfUpdated] = responseJSON;
        const modal = {
          showing: false,
          content: '',
          primaryButton: '',
          title: ''
        };
        this.setState({
          modal,
          itemsToBuy
        });
        this.handleFeedbackReset();
      }
    } catch (error) {
      console.error(error);
      this.handleCatchError();
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
    const modal = {
      showing: false,
      content: '',
      title: '',
      primaryButton: ''
    };
    setTimeout(() => {
      this.setState({
        modal,
        pendingConfirmDelete: false,
        communicatingWithServer: false
      });
    }, 2000);
  }

  cancelOperation() {
    const modal = {
      showing: false,
      content: '',
      title: '',
      primaryButton: null
    };
    this.setState({
      modal,
      pendingConfirmDelete: false,
      communicatingWithServer: false
    });
  }

  handleUpdateModal(event) {
    event.preventDefault();
    const { title, name, value, id } = event.target;
    const itemToUpdate = {
      store: title,
      item: name,
      quantity: value,
      itemId: id
    };
    const modal = {
      showing: true,
      content: <ModalInput
        newItem={this.newItem}
        isMobileLandscape={this.state.isMobilePortrait}
        itemToUpdate={itemToUpdate}
        updateItem={this.updateItem}
        communicatingWithServer={this.state.communicatingWithServer}
        cancelOperation={this.cancelOperation}
        addOrUpdate='update' />,
      title: 'Update Item'
    };
    this.setState({ modal });
  }

  handleRender() {
    let domView = null;
    const shoppingListView = (
      <>
        {this.state.modal.showing ? <Modal stateDotModal={this.state.modal} cancelOperation={this.cancelOperation} /> : null}
        <Header />
        <div className="container">
          <div className="row">
            <div id="itemForm" className="col-12 col-md-6">
              <ItemForm
                newItem={this.newItem}
                itemToUpdate={this.state.itemToUpdate}
                updateItem={this.updateItem}
                communicatingWithServer={this.state.communicatingWithServer}
                itemsToBuy={this.state.itemsToBuy} />
            </div>
            <div id="itemTable" className="col-12">
              <ItemTable
                itemsToBuy={this.state.itemsToBuy}
                delete={this.confirmDeleteItem}
                itemToUpdate={this.state.itemToUpdate}
                isMobile={this.state.isMobilePortrait}
                setView={this.setView}
                updateItem={this.updateItem}
                pendingConfirmDelete={this.state.pendingConfirmDelete}
                handleUpdateModal={this.handleUpdateModal} />
            </div>
          </div>
        </div>
      </>
    );
    const storeView = (
      <>
        <Header />
        <ListByStore store={this.state.view.store} setView={this.setView} />
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
