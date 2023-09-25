import { useContext } from 'react';

import { CartContext } from '../../context/cart-context';
import Button from '../button/button';
import CartItem from '../cart-item/cart-item';
import './cart-dropdown.styles.scss';

export default function CardDropdown (){
    const { cartItems } = useContext(CartContext);
    
    return(
        <div className='cart-dropdown-container'>
        <div className='cart-items'>
           {cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item}/>
            ))}
        </div>
        
        <Button id='button' buttonText={`CHECKOUT`} />
        </div>
    )
}