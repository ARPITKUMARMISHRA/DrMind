import { React, useState, useEffect } from "react";
import styled from "styled-components";

import doc from "../../../public/assets/images/doc.gif";

export default function Welcome({ name }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(name);
  }, [name, userName]);

  return (
    <Welcomebox>
      <img src={doc} alt="Doctor Image" />
      <br />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Welcomebox>
  );
}

const Welcomebox = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 5px;
  border: 1.8px solid #5f5fd1;
  color: unset;
  img {
    width: 75%;
  }
  span {
    color: #4e0eff;
  }
  @media screen and (min-width: 830px) {
    img{
      height: 20rem;
      width: auto;
    }
  }
`;
