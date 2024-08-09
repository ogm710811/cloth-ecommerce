import { Fragment } from 'react';
import './navigation.styles.scss';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutUser } from '../../utils/firebase/firebase.utils';

const Navigation = () => {
  // const {currentUser} = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  // const {isCartOpen} = useContext(CartContext);
  const isCartOpen = useSelector(selectIsCartOpen);


  const signOutHandler = async () => {
    await signOutUser();
    // const resp = await signOutUser()
    // if (!resp) setCurrentUser(null)
    // console.log(resp)
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div className="logo">{<CrownLogo/>}</div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">SHOP</Link>
          {
            currentUser
              ? <Link onClick={signOutHandler} to="/">SIGN OUT</Link>
              : <Link className="nav-link" to="/auth">SIGN IN</Link>
          }
          <CartIcon/>
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet/>
    </Fragment>
  );
};

export default Navigation;