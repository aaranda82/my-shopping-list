import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../../server/public/ColorScheme';

const { lightRed, red, lightGreen, green, lightBlue, black } = ColorScheme;
const Button = styled.button`
  background-color: ${props => props.color || lightRed};
  border: 0;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin: 0 5px 0 5px;
  &:focus{
    outline: none;
  }
  &:hover{
    background-color: ${props => props.hoverColor || red};
  }
  `;
const Store = styled.td`
  color: ${lightBlue};
  cursor: pointer;
  &:hover{
    color: ${black};
    text-decoration: underline;
  }
`;

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        item: this.props.item.item,
        store: this.props.item.store,
        quantity: this.props.item.quantity,
        itemId: this.props.item.itemid
      },
      itemIsBeingUpdated: false,
      itemError: '',
      storeError: '',
      quantityError: ''
    };

  }

  handleStoreOnClick() {
    if (!this.state.itemIsBeingUpdated) {
      return () => this.props.setView('store', this.props.item.store);
    } else {
      return null;
    }
  }

  render() {
    return (
      <tr>
        <th className="align-middle" scope="row">{this.props.index}</th>
        <td className="align-middle">{this.props.item.item}</td>
        <Store onClick={this.handleStoreOnClick()} >{this.props.item.store}</Store>
        <td className="align-middle">{this.props.item.quantity}</td>
        <td className="text-center">
          <Button type="button" id={this.props.item.itemid} onClick={this.props.delete}>Delete</Button>
          <Button color={lightGreen} hoverColor={green} type="button"
            name={this.props.item.item}
            value={this.props.item.quantity}
            title={this.props.item.store}
            id={this.props.item.itemid}
            onClick={this.props.handleUpdateModal} >
            Update
          </Button>
        </td>
      </tr>
    );
  }
}

export default Items;
