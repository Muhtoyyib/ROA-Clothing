import { createContext, useEffect, useReducer} from "react";

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

// eslint-disable-next-line react-refresh/only-export-components
export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART',
    DECREASE_ITEM_QUANTITY: 'DECREASE_ITEM_QUANTITY',
    CART_COUNT: 'CART_COUNT',
    CART_TOTAL: 'CART_TOTAL'
}

const cartContextReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
        return {
            ...state,
            cartItems: payload
        }
        case CART_ACTION_TYPES.ADD_ITEM_TO_CART:
            return{
                ...state,
                addItemToCart: payload
            }
        case CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART:
            return{
                ...state,
                removeItemFromCart: payload
            }
        case CART_ACTION_TYPES.DECREASE_ITEM_QUANTITY:
            return{
                ...state,
                decreaseItemQuantity: payload
            }
        case CART_ACTION_TYPES.CART_COUNT:
            return{
                ...state,
                cartCount: payload
            }
        case CART_ACTION_TYPES.CART_TOTAL:
            return{
                ...state,
                cartTotal: payload
            }
        default: 
        throw new Error(`Unhandled type ${type} in the userReducer`);
    }
}

const INITIAL_STATE = {
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}


// eslint-disable-next-line react/prop-types
export const CartProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(cartContextReducer, INITIAL_STATE);
    const { cartItems, cartCount, cartTotal} = state

    const setCartCount = (user) => {
        dispatch({type: CART_ACTION_TYPES.CART_COUNT, payload: user})
    }

    const setCartTotal = (user) => {
        dispatch({type: CART_ACTION_TYPES.CART_TOTAL, payload: user})
    }

    const setCartItems = (cartItem) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItem})
    }


    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0
        );
        setCartCount(newCartCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (total, cartItem) => total + (cartItem.price * cartItem.quantity), 0
        );
        setCartTotal(newCartTotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        dispatch({type: CART_ACTION_TYPES.ADD_ITEM_TO_CART, payload: setCartItems(addCartItem(cartItems, productToAdd))})
    }

    const removeItemFromCart = (itemToRemove) => {
        dispatch({type: CART_ACTION_TYPES.REMOVE_ITEM_FROM_CART, payload: setCartItems(removeCartItem(cartItems, itemToRemove))})
    }

    const decreaseItemQuantity = (item) => {
        dispatch({type: CART_ACTION_TYPES.DECREASE_ITEM_QUANTITY, payload: setCartItems(decreaseCartItemQuantity(cartItems, item))})
    }




    const value = {cartItems, addItemToCart, removeItemFromCart, decreaseItemQuantity, cartTotal, cartCount };
  
    
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}