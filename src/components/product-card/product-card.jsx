import Button from '../button/button';
import './product-card.scss';

// eslint-disable-next-line react/prop-types
export default function ProductCard ({ product }){
    // eslint-disable-next-line react/prop-types
    const { name, price, imageUrl } = product;

    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />

            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            
            <Button  buttonType='inverted' buttonText='Add to Cart' />
        </div>
    )
}