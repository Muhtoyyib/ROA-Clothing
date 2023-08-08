import { useContext } from "react";
import { Link } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase";

import { UserContext } from "../../context/user";
import CrownSvg from "../../assets/crown-svg";

import './navigation.styles.scss'


const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  
 
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
            </div>
        </div>
      
    </>
  )
}

export default Navigation;
