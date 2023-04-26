import { React, useEffect, useState } from "react";
import AuthContext from "./authContext";


const userExists = async (setLogin) => {
    const exists = await (async function () {
        try {
            let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/exists`, {
                method: 'POST',
                body: '',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (res.status === 200)
                return true;
            else
                return false;
        } catch (err) {
            console.log('Error occured while verifying user');
            return false;
        }
    })();
    setLogin(exists);
}


const AuthState = (props) => {
    const [login, setLogin] = useState(false);
    useEffect(() => {
        userExists(setLogin);
    }, []);
    return (
        <AuthContext.Provider value={[login, setLogin]}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthState;