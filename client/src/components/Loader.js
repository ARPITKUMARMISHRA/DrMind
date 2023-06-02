import React from 'react';

function Loader() {
    return (
        <div style={{ width: '25%', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
            <img src="assets/images/loader.gif" alt="loading" className="loader" />
        </div>
    );
};

export default Loader;