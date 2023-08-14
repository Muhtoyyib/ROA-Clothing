import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase";

import CartIcon from "../cart-icon/cart-icon";
import CardDropdown from "../card-dropdown/card-dropdown";
import { UserContext } from "../../context/user";
import CrownSvg from "../../assets/crown-svg";

import './navigation.styles.scss'


const Navigation = () => {
  const {currentUser} = useContext(UserContext);

  const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(initialState);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
  };

  const [toggle, setToggle] = useToggle(false);
  
 
  return (
    <>
        <div className="navigation">
            <Link to={`/`} className="logo-container">
              <CrownSvg />
            </Link>

            <div className="nav-links-container">
              <Link to={`/shop`} className="nav-link"> SHOP</Link>
              {
                currentUser ? ( <span className="nav-link" onClick={signOutUser}>SIGN OUT</span>) : (<Link to={`/auth`} className="nav-link"> SIGN IN</Link>)
              }
              
              <span type='button' onClick={setToggle}> <CartIcon/> </span>
            </div>

            { toggle && <CardDropdown />}
        </div>
      
    </>
  )
}

export default Navigation;
