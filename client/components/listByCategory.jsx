import React from 'react';
import ItemByCategory from './itemByCategory';

class ListByCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsByCategory: {}
    };
  }

  async componentDidMount() {
    const category = this.props.category;
    try {
      const response = await fetch(`/api/items/${category}`);
      const itemsByCategory = await response.json();
      if (!response.ok) {
        throw response;
      }
      this.setState({ itemsByCategory });
    } catch (error) {
      console.error(error);
    }
  }

  parseItems() {
    if (this.state.itemsByCategory.length > 0) {
      const itemsByCategoryParsed = this.state.itemsByCategory.map((itemObj, index) => {
        return <ItemByCategory item={itemObj} key={itemObj.itemid} index={index + 1} />;
      });
      return itemsByCategoryParsed;
    } else {
      const itemObj = {
        item: 'LOADING INFO',
        quantity: null
      };
      return <ItemByCategory item={itemObj} key={1} index={1} />;
    }
  }

  render() {
    return (
      <>
        <div className="text-center display-4 mb-3">{this.props.category}</div>
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

export default ListByCategory;
