import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ChatInput } from "./ChatInput";

export default function ChatContainer({ room, chat, login, socket, handleMsgToBeShown }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  // Storing all chat into messages hook
  useEffect(() => {
    console.log(chat);
    setMessages(chat);
  }, [chat]);

  // Handling the sending of message
  const handleSendMsg = async (msg) => {
    socket.emit('send-msg', { to: room._id, msg: msg, time: Date.now() });
    socket.on('get-sent-msg-id', ({ _id, time }) => {
      if (_id && time) {
        handleMsgToBeShown({ _id, sender: login.id, msg, time });
      }
    });
  };

  return (
    <Messagebox>

      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`https://api.multiavatar.com/4645646`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{room.name}</h3>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages && messages.map((message) => {
          return (
            <div ref={scrollRef} key={message._id}>
              <div
                className={`message ${(message.sender === login.id) ? "sended" : "recieved"}`}
              >
                <div className="content ">
                  <p>{message.msg + ', ' + message.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Messagebox>
  );
}

const Messagebox = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  border-radius: 5px;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: green;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          height: 3rem;
          display:flex;
          align-items:center;
        }
      }
    }
  }

  .chat-messages {
    padding: 0.5rem 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.15rem;
      background-color: transparent;
      &-thumb {
        background-color: #404040;
        width: 0.15rem;
        border-radius: 1rem;
      }
    }
    border-left: 1px solid green;
    border-right: 1px solid green;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #fbf2d5;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #fbf2d5;
      }
    }
  }
`;
