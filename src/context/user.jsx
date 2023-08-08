import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListerner, createUserDocFromAuth } from "../utils/firebase/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// eslint-disable-next-line react/prop-types
export const UserProvider =  ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser};


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListerner((user) => {
            if(user){
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    }, []);

    return(
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    )
}