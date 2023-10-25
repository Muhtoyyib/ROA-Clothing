import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { clearItemFromCart, addItemToCart, decreaseItemQuantity } from '../../store/cart/cart-action';
import { selectCartItems } from '../../store/cart/cart-selector';
import './checkout-item.scss';

// eslint-disable-next-line react/prop-types
export default function CheckoutItem ({ checkoutItem }){

    // eslint-disable-next-line react/prop-types
    const { name, imageUrl , price ,quantity}= checkoutItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const removeProductFromCart = () => dispatch(clearItemFromCart(cartItems, checkoutItem));
    const increaseQuantity = () => dispatch(addItemToCart(cartItems, checkoutItem));
    const decreaseQuantity = () => dispatch(decreaseItemQuantity(cartItems, checkoutItem));

    return(
        <div className="checkout-item-container ">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`} />
            </div>
            
            <span className="name"> {name} </span>
            <span className="quantity"> 
                <div onClick={decreaseQuantity} className='arrow'> &#10094; </div>
                <span className='value'> {quantity} </span>
                <div onClick={increaseQuantity} className='arrow'> &#10095; </div>
            </span>
            <span className="price"> ${price} </span>

            <div className="remove-button" onClick={removeProductFromCart}>&#10005;</div>
        </div>
    )
}