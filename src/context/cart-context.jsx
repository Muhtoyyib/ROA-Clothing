import { createContext, useState } from "react";

// eslint-disable-next-line no-unused-vars
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    console.log(existingCartItem);

    if(existingCartItem){
        let existingCartItemPosition = cartItems.indexOf(existingCartItem);
        cartItems.splice(existingCartItemPosition, 1);
        let newItem = {...existingCartItem, quantity: existingCartItem.quantity + 1}

         // return cartItems.map((cartItem) => {
        //     cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1}
        //     : cartItem
        // })
        
        return [...cartItems, newItem];
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}]
}

export const CartContext = createContext({
    cartItems: [],
    addItemToCart: () => {}
});

// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {cartItems, addItemToCart};
  
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}