import Button from '../button/button';
import './cart-dropdown.styles.scss';

export default function CardDropdown (){
    return(
        <div className='cart-dropdown-container'>
        <div className='cart-items' />
        <Button id='button' buttonText={`CHECKOUT`} />
        </div>
    )
}