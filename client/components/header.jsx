import React from 'react';
import { ColorScheme } from '../../server/public/ColorScheme';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${ColorScheme.blue};
`;

function header(props) {
  return (
    <Nav className="navbar text-white">
      <span className="navbar-brand">My Shopping List</span>
    </Nav>
  );
}

export default header;
