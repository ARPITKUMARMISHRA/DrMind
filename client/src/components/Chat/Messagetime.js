import React from 'react';
import styled from 'styled-components';

function Messagetime({ messagedate }) {
    let msgDate = new Date(messagedate);
    let time = `${msgDate.getHours()}:${msgDate.getMinutes()}`;
    let date = `${msgDate.getDate()} /${msgDate.getMonth()}/${msgDate.getFullYear()}`;
    return (
        <Time>{time}<br />{date}</Time>
    );
};

const Time = styled.div`
    display: flex;
    width: 100%;
    position: relative;
    justify-content: flex-end;
    align-items: baseline;
    font-size: 10px;
    line-height: 0.9;
    text-align: right;
    color: #976c6c;
`;

export default Messagetime;