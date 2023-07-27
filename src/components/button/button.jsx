import './button.styles.scss';
const buttonTypeClasses = {
    google: 'google-sign-in',
    inverted: 'inverted'
}
// eslint-disable-next-line react/prop-types
export default function Button({buttonText, buttonType, ...otherProps}){
    return(
        <button className={`button-container ${buttonTypeClasses[buttonType]}`} {...otherProps}>
            {buttonText}
        </button>
    )
}