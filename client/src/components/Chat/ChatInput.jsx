import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { ClickAwayListener } from "@mui/material";
import styled from "styled-components";
import { BsEmojiSmileFill } from "react-icons/bs";
import Picker from "emoji-picker-react";

export function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleClickAway = () => {
    setShowEmojiPicker(false);
  }
  const handleEmojiPickerShow = () => {
    document.querySelector(`#msginput`).focus();
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
    document.querySelector(`#msginput`).focus();
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>

      <div className="button-container">
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} lazyLoadEmojis={true} />}
          </div>
        </ClickAwayListener>
      </div>

      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          id="msginput"
          type="text"
          placeholder="Type your Message Here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          autoFocus
          autoComplete="off"
        />

        <button type="submit">
          <SendIcon />
        </button>
      </form>

    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 0.5rem;
  height: auto;
  border-bottom: 1px solid green;
  border-top: 1px solid green;
  background-color: green;
  padding: 0 1rem;
  gap: 1rem;
  @media screen and (min-width: 720px) {
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .epr-main {
        position: absolute;
        bottom: 36px;
        left: -13px;
        background-color: #ffffff;
        border-color: rgb(255 208 98);
        .epr-header {
          .epr-category-nav {
            button {
              filter: contrast(0);
            }
          }
          .epr-search {
            background-color: transparent;
            border-color: #d1d1d1;
          }
        }
        .epr-body::-webkit-scrollbar {
          width: 0.15rem;
          background-color: transparent;
          &-thumb {
            background-color: #404040;
            width: 0.15rem;
            border-radius: 1rem;
          }
        }
        .epr-preview:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;      
      background: linear-gradient(45deg, #2214ff, transparent);
      border: none;
      @media screen and (min-width: 720px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
      &:focus {
        outline: 1.5px solid black;
      }
    }
  }
`;
