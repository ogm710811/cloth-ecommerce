import {Link, Outlet} from "react-router-dom";
import {Fragment, useContext} from "react";
import './navigation.styles.scss';
import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import {UserContext} from "../../contexts/user.context";
import {signOutUser} from "../../utils/firebase.utils";

const Navigation = () => {
    const {currentUser, } = useContext(UserContext);
    // console.log(currentUser)

    const signOutHandler = async () => {
        await signOutUser()
        // const resp = await signOutUser()
        // if (!resp) setCurrentUser(null)
        // console.log(resp)
    }

    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to="/">
                    <div className="logo">{<CrownLogo/>}</div>
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser
                            ? <Link onClick={signOutHandler} to="/">SIGN OUT</Link>
                            : <Link className="nav-link" to="/auth">SIGN IN</Link>
                    }
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation;