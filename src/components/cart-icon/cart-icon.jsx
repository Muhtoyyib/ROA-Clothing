import { useContext } from 'react';

import ShoppingBag from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart-context';
import './cart-icon.styles.scss';

export default function CartIcon (){
    const { cartItems } = useContext(CartContext);

    const count = cartItems.length;
    return (
        <div className='cart-icon-container'>
         <img src={ShoppingBag} className='shopping-icon'/>
         <span className='item-count'> {count} </span>
        </div>
    )
}