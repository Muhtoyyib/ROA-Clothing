import { createContext, useState } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
});

// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen}
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}