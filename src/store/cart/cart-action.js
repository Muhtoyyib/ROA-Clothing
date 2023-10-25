import { createAction } from "../../utils/reducer/reducer-utils"
import { CART_ACTION_TYPES } from "./cart-action-types"

const { SET_CART_ITEMS } = CART_ACTION_TYPES;

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem( cartItems, productToAdd);
    return createAction(SET_CART_ITEMS, newCartItems);
}

export const decreaseItemQuantity = (cartItems, cartItemToRemove) => {
    const newCartItems = decreaseCartItemQuantity( cartItems, cartItemToRemove);
    return createAction(SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = removeCartItem( cartItems, cartItemToClear);
   return createAction(SET_CART_ITEMS, newCartItems);
}

