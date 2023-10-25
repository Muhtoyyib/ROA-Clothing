// import { useContext } from 'react';
import { useSelector } from 'react-redux';

import ShoppingBag from '../../assets/shopping-bag.svg';
import { selectCartCount } from '../../store/cart/cart-selector';
// import { CartContext } from '../../context/cart-context';
import './cart-icon.styles.scss';

export default function CartIcon (){
    // const { cartItems } = useContext(CartContext);
    const count = useSelector(selectCartCount);


    return (
        <div className='cart-icon-container'>
         <img src={ShoppingBag} className='shopping-icon'/>
         <span className='item-count'> {count} </span>
        </div>
    )
}