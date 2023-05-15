import React from 'react';
import styled from 'styled-components';

function Unreadcount({ count }) {
    return (
        count === 0 ? null
            :
            <Count><p>{count}</p></Count>
    );
}

const Count = styled.div`
    position: absolute;
    background-color: #0ffcf7;
    border-radius: 50%;
    width: 19px;
    height: 19px;
    display: flex;
    align-content: center;
    justify-content: center;
    font-size: 0.8rem;
    right: 1px;
    bottom: 10%;
`;

export default Unreadcount;