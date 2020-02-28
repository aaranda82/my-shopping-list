import React from 'react';
import ItemByStore from './itemByStore';

class ListByStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByStore: {}
    };
  }

  async componentDidMount() {
    const store = this.props.store;
    try {
      const response = await fetch(`/api/items/${store}`);
      const itemsByStore = await response.json();
      if (!response.ok) {
        throw response;
      }
      this.setState({ itemsByStore });
    } catch (error) {
      console.error(error);
    }
  }

  parseItems() {
    if (this.state.itemsByStore.length > 0) {
      const itemsByStoreParsed = this.state.itemsByStore.map((itemObj, index) => {
        return <ItemByStore item={itemObj} key={itemObj.itemid} index={index + 1} />;
      });
      return itemsByStoreParsed;
    } else {
      const itemObj = {
        item: 'LOADING INFO',
        quantity: null
      };
      return <ItemByStore item={itemObj} key={1} index={1} />;
    }
  }

  render() {
    return (
      <>
        <div className="text-center display-4 mb-3">{this.props.store}</div>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">Qty</th>
            </tr>
          </thead>
          <tbody>
            {this.parseItems()}
          </tbody>
        </table>
        <button className='btn btn-primary' onClick={() => this.props.setView('shoppingList', {})}>Back</button>
      </>
    );
  }
}

export default ListByStore;
