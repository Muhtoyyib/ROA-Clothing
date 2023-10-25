import { useEffect } from "react";
import { Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";


import { setCurrentUser } from "../store/user/user.action";
import { setCategoriesMap } from "../store/categories/categories-action";


import { onAuthStateChangedListerner, createUserDocFromAuth } from "../utils/firebase/firebase.js";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";




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

  useEffect(()=>{
      const getCategoriesMap = async () => {
          const categoryMap = await getCategoriesAndDocuments();

          dispatch(setCategoriesMap(categoryMap))
      }

      getCategoriesMap();
  }, [dispatch])


  return (
    <>
        <Navigation />
        <Outlet />
    </>
  )
}

export default Root;
