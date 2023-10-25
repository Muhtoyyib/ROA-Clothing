// import { useContext } from 'react';
import { useSelector } from 'react-redux';

import { selectCartItems } from '../../store/cart/cart-selector';

// import { CartContext } from '../../context/cart-context';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import './cart-dropdown.styles.scss';
import { useNavigate } from 'react-router-dom';

export default function CardDropdown (){
    // const { cartItems } = useContext(CartContext);

    const cartItems = useSelector( selectCartItems)
    const navigate = useNavigate();
    const goToCheckout = () => {
        navigate(`/checkout`)
    }
    
    return(
        <div className='cart-dropdown-container'>
        <div className='cart-items'>
           { cartItems.length !== 0 ? cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item}/>
            )) : <h2> Cart is Empty </h2>}
        </div>
        
         <Button onClick={goToCheckout} id='button' buttonText={`CHECKOUT`} />
        </div>
    )
}