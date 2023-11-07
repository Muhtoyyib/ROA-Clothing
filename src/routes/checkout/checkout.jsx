// import { useContext } from "react"
import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item";
import PaymentForm from "../../components/payment-form/payment-form";

import { selectCartItems, selectCartTotal } from "../../store/cart/cart-selector";


// import { CartContext } from "../../context/cart-context"

import './checkout.scss'


export default function Checkout(){
    const cartTotal = useSelector(selectCartTotal);
    const cartItems = useSelector(selectCartItems);
    // const { cartItems, clearItemFromCart, addItemToCart, decreaseItemQuantity, cartTotal} = useContext(CartContext);
    // const total = cartItems.map((item) => item.price).reduce((acct, price) => {
    //     return acct + price;
    // }, 0)

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
             <CheckoutItem key={item.id} checkoutItem={item} />
            ))}

            <span className="total">Total: ${cartTotal}</span>
            <PaymentForm />
        </div>
    )
}