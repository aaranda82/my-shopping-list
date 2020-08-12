import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../../server/public/ColorScheme';

const { red, white, lightRed, lightGreen, blue } = ColorScheme;
const Form = styled.form`
  padding: 20px;
`;
const Container = styled.div`
  padding: 10px 0px 10px 0px;
`;
const InputContainer = styled.div``;
const Label = styled.label`
  width: 100%;
  color: ${white};
  font-size: 1em;
`;
const Input = styled.input`
  border: solid 3px ${props => props.colors};
  background-color: white;
  font-size: 1em;
  width: 80%;
  border-radius: 10px;
  text-align: center;
  &:focus {
    outline: none;
  }
`;
const Error = styled.div`
  font-size: 20px;
  color: ${red};
`;

function renderInputs(
  label,
  type,
  text,
  value,
  onChange,
  onBlur,
  error,
  color
) {
  return (
    <Container>
      <InputContainer>
        <Label htmlFor={label}>{text}</Label>
        <Input
          colors={color}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        ></Input>
      </InputContainer>
      <Error>{error}</Error>
    </Container>
  );
}

class ModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToUpdate: {
        item: '',
        store: '',
        quantity: '',
        itemId: ''
      },
      itemError: '',
      storeError: '',
      quantityError: ''
    };
    this.itemChange = this.itemChange.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.quantityChange = this.quantityChange.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.validateItem = this.validateItem.bind(this);
    this.validateStore = this.validateStore.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
    this.itemInputColor = this.itemInputColor.bind(this);
    this.storeInputColor = this.storeInputColor.bind(this);
    this.quantityInputColor = this.quantityInputColor.bind(this);
  }

  componentDidMount() {
    const { itemToUpdate } = this.props;
    this.setState({ itemToUpdate });
  }

  itemChange(event) {
    const { value } = event.target;
    if (value.length > 65) {
      return false;
    } else {
      const itemToUpdate = { ...this.state.itemToUpdate };
      itemToUpdate.item = value;
      this.setState({
        itemToUpdate,
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
        return blue;
    }
  }

  storeChange(event) {
    const { value } = event.target;
    if (value.length > 25) {
      return false;
    } else {
      const itemToUpdate = { ...this.state.itemToUpdate };
      itemToUpdate.store = value;
      this.setState({
        itemToUpdate,
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
        return blue;
    }
  }

  quantityChange(event) {
    const { value } = event.target;
    if (value >= 0 && value <= 100) {
      const itemToUpdate = { ...this.state.itemToUpdate };
      itemToUpdate.quantity = value;
      this.setState({
        itemToUpdate,
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
        return blue;
    }
  }

  handleItemUpdate(event) {
    event.preventDefault();
    this.props.updateItem(this.state.itemToUpdate);
    this.handleCancel();
  }

  handleCancel() {
    const itemToUpdate = {
      item: '',
      store: '',
      quantity: '',
      itemId: ''
    };
    this.setState({
      itemToUpdate,
      itemError: '',
      storeError: '',
      quantityError: ''
    });
    this.props.cancelOperation();
  }

  render() {
    return (
      <Form>
        {renderInputs(
          'Item',
          'text',
          'I need:',
          this.state.itemToUpdate.item,
          this.itemChange,
          this.validateItem,
          this.state.itemError,
          this.itemInputColor
        )}
        {renderInputs(
          'Store',
          'text',
          'From:',
          this.state.itemToUpdate.store,
          this.storeChange,
          this.validateStore,
          this.state.storeError,
          this.storeInputColor
        )}
        {renderInputs(
          'Qunatity',
          'number',
          'Quantity:',
          this.state.itemToUpdate.quantity,
          this.quantityChange,
          this.validateQuantity,
          this.state.quantityError,
          this.quantityInputColor
        )}
        <button
          type="submit"
          className="btn btn-success"
          onClick={this.handleItemUpdate}
        >
          {' '}
          Update{' '}
        </button>
        <button
          type="button"
          className="btn btn-dark m-1"
          onClick={this.handleCancel}
        >
          CANCEL
        </button>
      </Form>
    );
  }
}

export default ModalForm;
