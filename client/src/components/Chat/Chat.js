import { React, useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../contexts/auth/authContext";

import ChatContainer from "./ChatContainer";
import Contacts from "./Contacts";
import Welcome from "./Welcome";
import Navbar from '../Navbar/Navbar';
import loader from "../../../public/assets/images/loader.gif";

export default function Chat({ arrivedMsg }) {
  const [login, setLogin, socket] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [onlineRooms, setOnlineRooms] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [unseen, setUnseen] = useState(new Map());

  // When Component is loaded successfully
  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  // Load users or when a new user joins
  useEffect(() => {
    if (login && socket) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/chat/getUsers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      }).then(async (data) => {
        data = await data.clone().json();
        setRooms(data.allusers);
        const newUnseenMap = new Map();
        await data.allrooms.forEach(element => {
          newUnseenMap.set(element.other, element.unseen);
        });
        setUnseen(newUnseenMap);
      });

      // Online features
      socket.emit('get-online-users');
      socket.on('receive-online-users', async (onlineUsers) => {
        // console.log(onlineUsers);
        setOnlineRooms(onlineUsers);
      });
      socket.on('new-user', async (newUser) => {
        setOnlineRooms([...onlineRooms, newUser]);
      });
      socket.on('user-left', async (roomid) => {
        let ind = onlineRooms.findIndex((value) => value._id === roomid);
        const newRooms = [...onlineRooms.slice(0, ind), ...onlineRooms.slice(ind + 1)];
        setOnlineRooms(newRooms);
      });

      return () => {
        socket.off('receive-online-users');
        socket.off('new-user');
        socket.off('user-left');
      }
    }
  }, []);

  // Change the chat
  const handleChatChange = ({ room, chat }) => {
    setCurrentChat({ room, chat });
  };

  // Hangle the message that need to be shown in chat container
  const handleMsgToBeShown = (newMessage) => {
    console.log(newMessage);
    setCurrentChat({ room: currentChat.room, chat: [...currentChat.chat, newMessage] });
  }

  // Update the number of unseen message for each contacted user
  const handleUnseenCount = (from, count) => {
    if (unseen) {
      const newUnseen = new Map(unseen);
      if ((count !== undefined) && (count !== null))
        newUnseen.set(from, count);
      else {
        let oldcount = unseen.has(from) ? unseen.get(from) : 0;
        newUnseen.set(from, oldcount + 1);
      }
      setUnseen(newUnseen);
    }
  }


  return (
    <div>
      <Navbar />
      {isLoading ?
        <div style={{ width: '25%', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
          <img src={loader} alt="loading" className="loader" />
        </div>
        :
        <Chatbox>
          <Contacts user={login} rooms={rooms} onlineRooms={onlineRooms} handleChatChange={handleChatChange} arrivedMsg={arrivedMsg} handleMsgToBeShown={handleMsgToBeShown} handleUnseenCount={handleUnseenCount} unseen={unseen} />
          {currentChat === undefined ?
            <Welcome name={login.name} />
            :
            <ChatContainer room={currentChat.room} chat={currentChat.chat} login={login} socket={socket} handleMsgToBeShown={handleMsgToBeShown} />
          }
        </Chatbox>
      }
    </div>
  );
}

const Chatbox = styled.div`
  min-height: calc(100vh - 70px); /* 60px is height of Navbar, so 70px=60px+margin */
  height: 100%;
  width: calc(100vw - 15px);
  margin: 5px;
  align-items: center;
  background-color: white;
  display: grid;
  gap: 5px;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) {
    grid-template-columns: 30% 70%;
  }
`;
