import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../../server/public/ColorScheme';

const { blue, black, white } = ColorScheme;
const Shade = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: ${black};
  opacity: 0.6;
  z-index: 1;
`;
const TheModal = styled.div`
  z-index: 1;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  background-color: ${blue};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
`;
const Title = styled.div`
  color: ${white};
  width: 90%;
  text-align: center;
  font-size: 2em;
`;
const Cancel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${white};
  &:hover{
    color: ${black};
  }
`;
const Content = styled.div`
  padding: 10px;
`;
function Modal(props) {
  const { content, primaryButton, title } = props.stateDotModal;
  return (
    <>
      <Shade></Shade>
      <TheModal role="document">
        <Title>{title}</Title>
        <Cancel onClick={props.cancelOperation} title="Cancel">
          X
        </Cancel>
        <Content>
          {content}
        </Content>
        <div >
          {primaryButton || null}
        </div>
      </TheModal>
    </>
  );
}

export default Modal;
