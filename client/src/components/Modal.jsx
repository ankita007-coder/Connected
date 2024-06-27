import React from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const Modal = ({ title, onClose, children }) => {
  return (
    <Wrapper>
      <div className="box">
        <div className="head-row">
          <h1></h1>
          <h3>{title}</h3>
          <button onClick={onClose}>
            <IoClose />
          </button>
        </div>

        {children}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0000002e;
  z-index: 99;
  height: 100%;
  width: 100%;
  .box {
    background-color: #eee;
    height: 80%;
    z-index: 100;
    width: 50%;
    border-radius: var(--border-radius-1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border: 4px solid var(--border);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    .head-row {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 12px;
      h3 {
        text-align: center;
        margin-top: 8px;
      }
      button {
        border: none;
        font-size: 2rem;
      }
    }
  }
`;
export default Modal;
