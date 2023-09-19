import { useState, createContext} from "react";
import PRODUCTS from '../../src/shop-data.json'

export const ProductsContext = createContext({
    products: [],
    setProduct: () => [],
})

// eslint-disable-next-line react/prop-types
export const ProductsProvider = ({children}) => {
    // eslint-disable-next-line no-unused-vars
    const [products, setProduct] = useState(PRODUCTS);
    const value = { products};

    return(
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    )
}