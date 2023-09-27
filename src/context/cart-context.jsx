import { createContext, useState } from "react";

// eslint-disable-next-line no-unused-vars
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if(existingCartItem){
        let itemIndex = cartItems.indexOf(existingCartItem);
        cartItems[itemIndex] = {...existingCartItem, quantity: existingCartItem.quantity + 1}
        
        return [...cartItems];
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, itemToRemove) => {
    const itemPosition = cartItems.indexOf(itemToRemove);
    cartItems.splice(itemPosition, 1);


    return [...cartItems];
}


const decreaseCartItemQuantity = (cartItems, itemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === itemToRemove.id);
    let itemIndex = cartItems.indexOf(existingCartItem);

    if(existingCartItem.quantity === 1){
        cartItems.splice(itemIndex, 1);
        
        return [...cartItems];
    } else {
        cartItems[itemIndex] = {...existingCartItem, quantity: existingCartItem.quantity - 1}
    }

    return [...cartItems];
}

export const CartContext = createContext({
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    decreaseItemQuantity: () => {}
});

// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems, itemToRemove));
    }

    const decreaseItemQuantity = (item) => {
        setCartItems(decreaseCartItemQuantity(cartItems, item))
    }


    const value = {cartItems, addItemToCart, removeItemFromCart, decreaseItemQuantity };
  
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}