// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// import { CartContext } from '../../context/cart-context';
import { selectCartItems } from '../../store/cart/cart-selector';
import { addItemToCart } from '../../store/cart/cart-action';
import Button from '../button/button';
import './product-card.scss';

// eslint-disable-next-line react/prop-types
export default function ProductCard ({ product }){
    const dispatch = useDispatch();
    // eslint-disable-next-line react/prop-types
    const { name, price, imageUrl } = product;
    // const { addItemToCart } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);
    // const addItemToCart = useSelector( selectAddItemToCart )

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));


    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />

            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            
            <Button onClick={addProductToCart} buttonType='inverted' buttonText='Add to Cart'/>
        </div>
    )
}