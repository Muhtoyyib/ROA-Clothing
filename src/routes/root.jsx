import { useEffect } from "react";
import { Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";

import { setCurrentUser } from "../store/user/user.action";


import { onAuthStateChangedListerner, createUserDocFromAuth } from "../utils/firebase/firebase.js";


import Navigation from "../components/navigation/navigation";


const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListerner((user) => {
        if(user){
            createUserDocFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    })

    return unsubscribe;
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [dispatch]);

  return (
    <>
        <Navigation />
        <Outlet />
    </>
  )
}

export default Root;
