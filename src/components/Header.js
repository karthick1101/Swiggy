import logo from '../../images/foodie_faster.jpg'
import {useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import useOnlineStatus from '../../utils/useOnlineStatus';
import UserContext from '../../utils/UserContext';
import { useSelector } from 'react-redux';

export const Header = () => {
    const [btnNameReact,setBtnNameReact]=useState('Login');
    console.log("header render");
    useEffect(()=>{
      // console.log("useEffectCalled");
    },[btnNameReact]);
    const onlineStatus=useOnlineStatus();
    const {loggedInUser}=useContext(UserContext);

    //subscribing to the store using a selector
    const cartItems=useSelector((store)=>store.cart.items)
    console.log(cartItems)
    return (
      <div className="flex justify-between  shadow-lg items-center bg-green-50">
        <div className="logo-container">
          <Link to='/grocery' ><img  className='w-100' src={logo} width="150px" /></Link>
        </div>
        <div className="nav-items">
          <ul className='flex gap-10'>
            <li> {onlineStatus===true ? 'Online  🟢' :'Offline  🔴'}   </li>
            <li><Link to='/' >Home</Link></li>
            {/* <li><Link to='/about'>About</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li> */}
            <li className='px-4 font-bold ' >
              <Link to='/Cart' >Cart : {cartItems.length} </Link>
            </li>
            <li>
              <button onClick={()=>{btnNameReact==='Logout' ? setBtnNameReact('Login') : setBtnNameReact('Logout');}}>
                  {btnNameReact}
              </button>
            </li>
            <li className='px-4 font-bold' >{ btnNameReact==='Login' ? "Default User" : loggedInUser}</li>
          </ul>
        </div>
      </div>
    ); // round brackets for babel to keep track
  };
  
export default Header;

