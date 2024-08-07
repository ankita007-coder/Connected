import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: flex-end; /* Align items to the bottom */
  padding-bottom: 20px; /* Padding to ensure space for the message box */
  width: 100%;
  .messages{
    overflow-y:auto;
   // max-height: 100px;,
   .message.own{
    float: right;
    list-style-type: none;
   }
  }
  .messages.emojiopen{
    max-height: 100px;
  }

  .message-box {
    display: flex;
    align-items: center;
    padding: 4px;
    background-color: #f0f0f0;
    position: sticky;
    bottom: 0;
    width: 100%;
    border: 2px solid var(--border);
    border-radius: var(--border-radius-2);
    input {
      flex: 1; /* Take up remaining space */
      padding: 8px;
      margin-right: 10px;     
      border-radius: 4px;
      font-size: 16px;
      background-color: transparent;
    }
    
    button {
      background: transparent;
      border: none;
      cursor: pointer;
      font-size: 20px;
    }
    .icon{
      color: var(--color-1);
    }
  }
`;

export default Wrapper;
