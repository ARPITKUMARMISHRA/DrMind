import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Unreadcount from "./Unreadcount";

function Group({ group }) {
  const [color, setColor] = React.useState(() => {
    if (group === 'red') return 'red';
    if (group === 'green') return 'green';
  });
  return (
    <span
      style={{
        display: 'inline-block',
        width: '11px',
        height: '11px',
        backgroundColor: color,
        borderRadius: '50%',
        marginLeft: '5px'
      }}
    ></span>
  );
}

export default function Contacts({ user, rooms, onlineRooms, handleChatChange, arrivedMsg, handleMsgToBeShown, handleUnseenCount, unseen }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [onlineRoomsMap, setOnlineRoomsMap] = useState(new Map());

  useEffect(() => {
    // Transfering all online Rooms into a Map
    const map = new Map();
    onlineRooms.forEach(onlineRoom => {
      map.set(onlineRoom._id, onlineRoom.name);
    });
    setOnlineRoomsMap(map);
  }, [onlineRooms]);

  // When the chat is changed
  const changeCurrentChat = async (room) => {
    setCurrentSelected(room._id);
    handleUnseenCount(room._id, 0);
    // Getting a chatroom from server
    let chat = await (await fetch(`${process.env.REACT_APP_SERVER_URL}/chat/getChatRoom`, {
      method: 'POST',
      body: JSON.stringify({ otheruser: room._id }),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })).clone().json();
    handleChatChange({ room, chat });
  };

  // On message arrival
  useEffect(() => {
    if (arrivedMsg && arrivedMsg.from) {
      console.log(arrivedMsg);
      arrivedMsg._id = arrivedMsg._id.toString();
      // Seen
      if (currentSelected === arrivedMsg.from) {
        // Show message in Chat Container
        handleMsgToBeShown({ _id: arrivedMsg._id, sender: arrivedMsg.from, msg: arrivedMsg.msg, time: arrivedMsg.time })
        // Inform server that message has been seen
        fetch(`${process.env.REACT_APP_SERVER_URL}/chat/msgSeen`, {
          method: 'POST',
          body: JSON.stringify({ otheruser: arrivedMsg.from }),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });
        handleUnseenCount(arrivedMsg.from, 0);
      }
      // Not seen
      else {
        handleUnseenCount(arrivedMsg.from);
      }
    }
  }, [arrivedMsg]);

  return (
    <Contactbox>
      <div className="heading">
        <h3>Contacts</h3>
      </div>

      <div className="contacts">
        {rooms.map((room, index) => {
          if (room._id && room.name && room._id !== user.id) {
            return (
              <div
                key={room._id}
                className={`contact ${onlineRoomsMap.has(room._id) ? "online" : ""} ${room._id === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(room)}
              >
                <div className="avatar">
                  <img
                    src={`https://api.multiavatar.com/4645646`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{room.name}</h3>
                </div>
                <Unreadcount count={((unseen && unseen.has(room._id) && unseen.get(room._id) > 0) ? unseen.get(room._id) : 0)} />
              </div>
            );
          } else {
            return (null);
          }
        })}
      </div>

      <div className="current-user">
        {/* <div className="avatar">
          <img
            src={`https://api.multiavatar.com/4645646`}
            alt="avatar"
          />
        </div> */}
        <div className="username">
          <h2>{user.name}</h2><Group group={user.group} />
        </div>
      </div>

    </Contactbox>
  );
}




const Contactbox = styled.div`
  height: calc(100vh - 70px);
  min-width: 150px;
  overflow: hidden;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  background-color: #a393eb;

  .heading {
    display: flex;
    align-items: center;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    background-color: #7dace4;
    gap: 1rem;
    padding: 5px;
    justify-content: center;
    h3 {
      color: black;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 8px;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.15rem;
      background-color: transparent;
      &-thumb {
        background-color: #404040;
        width: 0.15rem;
        border-radius: 1rem;
      }
    }
    
    .contact {
      position: relative;
      background-color: #fbf2d5;
      cursor: pointer;
      width: 100%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
          text-align: center;
        }
      }
    }
    .selected {
      transition: 0.5s ease-in-out;
      background-color: pink;
    }
    .online {
      outline: 2px green solid;
    }
  }

  .current-user {
    background-color: #ffb677;
    display: flex;
    padding: 3px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      height: 4rem;
      display: flex;
      align-items: center;
      h2 {
        color: black;
        font-size: 1rem;
        text-align: center;
      }
    }
  }
`;
