import { useState, createContext, useEffect} from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase";


// import { addCollectionAndDocuments } from "../utils/firebase/firebase.js";
// import SHOP_DATA from '../../src/shop-data.js';

export const CategoriesContext = createContext({
    categoriesMap: {},
})

// eslint-disable-next-line react/prop-types
export const CategoriesProvider = ({children}) => {
    // eslint-disable-next-line no-unused-vars
    const [categoriesMap, setCategoriesMap] = useState({});
    useEffect(()=>{
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }

        getCategoriesMap();
    }, [])
    const value = { categoriesMap };

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    return(
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
}