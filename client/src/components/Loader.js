import React from 'react';
import loader from "../../public/assets/images/loader.gif";

function Loader() {
    return (
        <div style={{ width: '25%', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
            <img src={loader} alt="loading" className="loader" />
        </div>
    );
};

export default Loader;