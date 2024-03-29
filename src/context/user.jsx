import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListerner, createUserDocFromAuth } from "../utils/firebase/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

// eslint-disable-next-line react-refresh/only-export-components
export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER: 
        return {
            ...state,
            currentUser: payload
        }
        default: 
        throw new Error(`Unhandled type ${type} in the userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// eslint-disable-next-line react/prop-types
export const UserProvider =  ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [ {currentUser}, dispatch ] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user})
    }
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

/* 
const userReducer = (state, action) => {
    return {
        currenrUser: nulll
    }
}
*/