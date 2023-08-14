import ShoppingBag from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

export default function CartIcon (){
    return (
        <div className='cart-icon-container'>
         <img src={ShoppingBag} className='shopping-icon'/>
         <span className='item-count'>0</span>
        </div>
    )
}