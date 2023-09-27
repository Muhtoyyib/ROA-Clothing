import { useContext } from "react"

import CheckoutItem from "../../components/checkout-item/checkout-item";
import { CartContext } from "../../context/cart-context"

import './checkout.scss'


export default function Checkout(){
    const { cartItems, removeItemFromCart , addItemToCart, decreaseItemQuantity} = useContext(CartContext);
    const total = cartItems.map((item) => item.price).reduce((acct, price) => {
        return acct + price;
    }, 0)

    return(
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span> Product </span>
                </div>

                <div className="header-block">
                    <span> Description </span>
                </div>

                <div className="header-block">
                    <span> quantity </span>
                </div>

                <div className="header-block">
                    <span> Price </span>
                </div>

                <div className="header-block">
                <span> Remove </span>
                </div>
            </div>

            {cartItems.map((item) => (
             <CheckoutItem key={item.id} checkoutItem={item} removeItem={removeItemFromCart} 
             increaseItemQuantity={addItemToCart} decreaseItemQuantity={decreaseItemQuantity}/>
            ))}

            <span className="total">Total: {total}</span>
        </div>
    )
}