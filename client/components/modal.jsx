import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../../server/public/ColorScheme";

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
  background-color: ${blue};
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border-radius: 10px;
  padding: 40px;
  width: 40%;
  @media (max-width: 900px) {
    & {
      width: 60%;
    }
  }
  @media (max-width: 600px) {
    & {
      width: 100%;
    }
  }
`;
const Title = styled.div`
  color: ${white};
  width: 90%;
  text-align: center;
  font-size: 2em;
`;
const Cancel = styled.div`
  position: absolute;
  top: 5%;
  right: 7%;
  cursor: pointer;
  font-size: 2em;
  color: ${white};
  &:hover {
    color: ${black};
  }
  @media (max-width: 600px) {
    & {
      top: 3%;
      right: 5%;
    }
  }
`;
const Content = styled.div`
  width: 100%;
  padding: 20px 0px 20px 0px;
  text-align: center;
  color: ${white};
  font-size: 2em;
  font-family: "Arial Black", Gadget, sans-serif;
`;
function Modal(props) {
  const { content, primaryButton, title } = props.stateDotModal;
  return (
    <>
      <Shade></Shade>
      <TheModal role="document">
        <Title>{title}</Title>
        <Cancel onClick={props.cancelOperation} title="Cancel">
          <i className="fas fa-times"></i>
        </Cancel>
        <Content>{content}</Content>
        <div>{primaryButton || null}</div>
      </TheModal>
    </>
  );
}

export default Modal;
