import { createContext, useEffect, useState } from "react";

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
    decreaseItemQuantity: () => {},
    cartCount: 0,
    cartTotal: 0
});

// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
        setCartCount(newCartCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + cartItem.price, 0
        );
        setCartTotal(newCartTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (itemToRemove) => {
        setCartItems(removeCartItem(cartItems, itemToRemove));
    }

    const decreaseItemQuantity = (item) => {
        setCartItems(decreaseCartItemQuantity(cartItems, item))
    }


    const value = {cartItems, addItemToCart, removeItemFromCart, decreaseItemQuantity, cartTotal, cartCount };
  
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}