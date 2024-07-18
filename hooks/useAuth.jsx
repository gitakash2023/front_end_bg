"use client"
import { useState } from 'react';
import { authenticateUser } from '../utils/auth';


const useAuth = () => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        const authUser = authenticateUser(username, password);
        setUser(authUser);
        return authUser;
    };

    return { user, login };
};

export default useAuth;
